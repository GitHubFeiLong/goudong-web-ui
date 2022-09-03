// Axios.ts
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {ElMessage} from 'element-plus';

import Result from '@/pojo/Result';
import * as HttpHeaderConst from '@/constant/HttpHeaderConst';
import {TOKEN_LOCAL_STORAGE, USER_LOCAL_STORAGE} from '@/constant/LocalStorageConst';
import LocalStorageUtil from '@/utils/LocalStorageUtil';
import Token from '@/pojo/Token';
import {refreshTokenApi} from '@/api/GoudongOauth2ServerApi';
import {validateUrlAuthentication, validateUrlNotAuthentication} from '@/utils/ValidateUtil';
import {LOGIN_PAGE} from '@/constant/PageUriConst';
import CustomAxiosRequestConfig from '@/pojo/CustomAxiosRequestConfig';
import * as AESUtil from '@/utils/AESUtil';
import * as RSAUtil from '@/utils/RSAUtil';
import {RequestOther} from '@/pojo/RequestOther';
import {ResponseOther} from '@/pojo/ResponseOther';

// ~ axios 配置默认选项
//= =================================================================================================
/**
 * 初始化 axios
 */
const service = axios.create({
  // 是否跨站点访问控制请求
  withCredentials: true,
  timeout: 30000,
  // 请求头配置
  headers: {
    post: {
      'Content-Type': 'application/json;',
    },
    patch: {
      'Content-Type': 'application/json;',
    },
  },
  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest(data) {
    if (data instanceof FormData) {
      return data;
    }
    if (typeof data === 'object') {
      return JSON.stringify(data);
    }

    return data;
  },
  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 reject
  validateStatus(status) {
    return status < 500;
  },
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [(data) => {
    if (typeof data === 'string' && data.startsWith('{')) {
      return JSON.parse(data);
    }
    return data;
  }],

});

/**
 * 请求拦截器
 */
service.interceptors.request.use((config: AxiosRequestConfig) => {
  // 请求参数加密
  let requestOther = requestOtherHandler(config);

  // 不是登录和刷新令牌url，就进入if，携带令牌请求
  if (validateUrlNotAuthentication(config.url)) {
    // 获取token，并将其添加至请求头中
    const token: Token = Token.toToken(LocalStorageUtil.get(TOKEN_LOCAL_STORAGE) as Token);
    if (token != null && !token.isAccessExpires()) {
      config.headers[HttpHeaderConst.AUTHORIZATION] = `Bearer ${token.accessToken}`;
    }
  }
  return config;
}, (error) => {
  console.error(`请求拦截器出现错误：${error}`);
  // 错误抛到业务代码
  error.data = {};
  error.data.msg = '服务器异常，请联系管理员！';
  return Promise.reject(error);
});


// 重试队列，每一项将是一个待执行的函数形式
let requests: any[] = [];
// 是否正在刷新的标记
let isRefreshing = false;

/**
 * 刷新令牌
 * @param token 令牌对象
 * @param config axios的配置对象
 * @param result 响应结果。
 */
function refreshingToken(token: Token, config: AxiosRequestConfig, result: Result<any>) {
  if (!isRefreshing) {
    isRefreshing = true;
    return new Promise((resolve, reject) => {
      // 请求刷新令牌
      refreshTokenApi(token.refreshToken).then((response) => {
        // 这个是才后端反的data一层数据
        let result = response.data.data;
        // 生成token对象
        const newToken = new Token(result.accessToken, result.refreshToken, result.accessExpires, result.refreshExpires);
        // 设置token对象
        LocalStorageUtil.set(TOKEN_LOCAL_STORAGE, newToken);

        // 防止刷新令牌处理完成后，其它请求又401，所以延时补发请求。
        setTimeout(() => {
          // 其它失败的请求进行补发
          requests.forEach((cb) => cb());
          // 刷新token获取后，补偿本次失败的请求【成功】
          requests = [];
        }, 3000);
        return service(config);
      }).catch(() => {
        ElMessage.error(result.clientMessage);
        console.error('刷新令牌时，refresh_token无效，跳转到登录页');
        // 刷新令牌失败，直接跳转登录界面
        LocalStorageUtil.remove(TOKEN_LOCAL_STORAGE);
        LocalStorageUtil.remove(USER_LOCAL_STORAGE);
        requests = [];
        window.location.href = LOGIN_PAGE;
      }).finally(() => {
        isRefreshing = false;
      });
    });
  }
  // 正在刷新token，返回一个未执行resolve的promise
  return new Promise((resolve) => {
    // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
    requests.push(() => {
      service(config);
    });
  });
}

/**
 * 响应拦截器
 */
service.interceptors.response.use((response: AxiosResponse<Result<any>>) => {
  console.log('响应拦截:', response);
  let responseOther = responseOtherHandler(response);
  // 响应码
  const { status } = response;
  const { config } = response;
  const result = response.data;

  // 响应码401，需要重新登录（或使用无感刷新token）
  if (status === 401) {
    // 登录或刷新令牌 请求返回401，返回reject
    if (validateUrlAuthentication(config.url)) {
      return Promise.reject();
    }

    requests.push(() => {
      service(config);
    });

    // 其它请求，获取token
    const token: Token = Token.toToken(LocalStorageUtil.get(TOKEN_LOCAL_STORAGE) as Token);
    // 这里进行判断，只有一个请求进入判断
    return refreshingToken(token, config, result);
  }

  if (status < 200 || status >= 400) {
    // TODO 有些接口并不希望直接弹出提示框
    // 弹出客户端提示
    ElMessage.error(result.clientMessage);
    // 打印服务端提示
    console.error(result.serverMessage);
    // 设置响应为错误，
    return Promise.reject(response);
  }

  return Promise.resolve(response);
}, (error) => {
  // console.log(error);
  if (axios.isCancel(error)) {
    // 取消请求
    console.log(`repeated request: ${error.message}`);
  } else {
    // handle error code
    // 错误抛到业务代码
    error.data = {};
    error.data.msg = '请求超时或服务器异常，请检查网络或联系管理员！';
    ElMessage.error(error.data.msg);
  }
  return Promise.reject(error);
});

/**
 * 生成AES密钥，并设置aes密钥密文到请求头`X-Aes-Key`中
 * @param requestOther 额外的请求参数
 * @param responseOther 额外响应的参数
 * @param config
 */
function setAesKey(requestOther: RequestOther, responseOther: ResponseOther, config: AxiosRequestConfig) {
  if (requestOther.needAesEncrypt || responseOther.needAesDecrypt) {
    // 生成AES密钥
    let key = AESUtil.generateKey();
    // 将aes的key设置到属性上
    requestOther.aesKey = key;
    // 添加X-Aes-Key到请求头
    config.headers[HttpHeaderConst.X_AES_KEY] = RSAUtil.encrypt(key);
  }
}

/**
 * 请求使用AES加密处理
 * @param config
 * @param requestOther
 */
function requestNeedAesEncryptHandler(config: AxiosRequestConfig, requestOther: RequestOther) {
  console.log('本次请求体需要加密----');
  console.log('加密前数据：', config.data);
  let key = requestOther.aesKey;
  switch (typeof (config.data)) {
    case 'object':
      // 加密
      config.data = AESUtil.encrypt(JSON.stringify(config.data), key);
      break;
    default:
      // 加密
      config.data = AESUtil.encrypt(config.data as string, key);
      break;
  }
  console.log('加密后：', config.data);
}

/**
 * 请求使用RSA加密处理
 * @param config
 */
function requestNeedRsaEncryptHandler(config: AxiosRequestConfig) {
  console.log('本次请求体需要加密----');
  console.log('加密前数据：', config.data);
  switch (typeof (config.data)) {
    case 'object':
      // 加密
      config.data = RSAUtil.encrypt(JSON.stringify(config.data));
      break;
    default:
      config.data = RSAUtil.encrypt(config.data as string);
      break;
  }
}

/**
 * 请求额外处理
 * @param config
 * @return requestOther
 */
function requestOtherHandler(config: AxiosRequestConfig): RequestOther {
  let requestOther = (config as CustomAxiosRequestConfig)._requestOther;
  let responseOther = (config as CustomAxiosRequestConfig)._responseOther;
  console.log(1);
  if (requestOther) {
    // 设置额外的请求头
    let { headers } = requestOther;
    headers.forEach((item) => {
      console.log(item.key, item.value);
      config.headers[item.key] = item.value;
    });
  }
  if (requestOther && responseOther) {
    // 设置AES密钥
    setAesKey(requestOther, responseOther, config);

    // 需要请求加密
    if (requestOther && requestOther.needAesEncrypt) {
      requestNeedAesEncryptHandler(config, requestOther);
    } else if (requestOther.needRsaEncrypt) {
      requestNeedRsaEncryptHandler(config);
    }
  }


  return requestOther;
}

/**
 * 响应额外处理
 * @param config
 * @return responseOther
 */
function responseOtherHandler(config: AxiosResponse): ResponseOther {
  let responseOther = (config.config as CustomAxiosRequestConfig)._responseOther;
  let requestOther = (config.config as CustomAxiosRequestConfig)._requestOther;
  if (requestOther && responseOther) {
    if (responseOther.needAesDecrypt) {
      console.log('解密前数据：', config.data);
      config.data = AESUtil.decrypt(config.data,
        requestOther.aesKey as string);
      config.data = JSON.parse(config.data);
      // 添加X-Aes-Key到请求头
      console.log('解密后：', config.data);
    }
  }

  return responseOther;
}

export default service;


