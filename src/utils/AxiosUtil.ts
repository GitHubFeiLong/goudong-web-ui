// Axios.ts
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {ElMessage} from 'element-plus';

import Result from '@/pojo/Result';
import {Dispose401StatusEnum} from '@/enumerate/Dispose401StatusEnum';
import {refreshToken} from '@/utils/RefreshTokenUtil';
import {
  AUTHORIZATION,
  BEARER,
  DISPOSE_401_STATUS,
  TOKEN_LOCAL_STORAGE,
  USER_LOCAL_STORAGE,
} from '@/pojo/ProjectConst';
import LocalStorageUtil from '@/utils/LocalStorageUtil';
import Token from "@/pojo/Token";
import {logoutApi, refreshTokenApi} from "@/api/GoudongOauth2ServerApi";
import AxiosUtil from "@/utils/AxiosUtil";
import {validateHeaderNeedlessToken} from "@/utils/ValidateUtil";

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
      'Content-Type': 'application/json;charset=UTF-8',
    },
    patch: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  },
  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [(data) => JSON.stringify(data)],
  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
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
  // 获取token，并将其添加至请求头中
  const token:Token = Token.toToken(LocalStorageUtil.get(TOKEN_LOCAL_STORAGE) as Token);
  validateHeaderNeedlessToken(config.url).then(boo => {
    if (!boo) {
      config.headers[AUTHORIZATION] = `Bearer ${token.accessToken}`;
    }
  });
  return config;
}, (error) => {
  console.error(`请求：${error}`);
  // 错误抛到业务代码
  error.data = {};
  error.data.msg = '服务器异常，请联系管理员！';
  return Promise.resolve(error);
});

// 重试队列，每一项将是一个待执行的函数形式
let requests: any[] = [];
// 是否正在刷新的标记
let isRefreshing = false
/**
 * 响应拦截器
 */
service.interceptors.response.use((response: AxiosResponse<Result<any>>) => {
  console.log(response);
  // 响应码
  const { status } = response;
  const config  = response.config;
  const result = response.data;
  // 获取token
  const token:Token = Token.toToken(LocalStorageUtil.get(TOKEN_LOCAL_STORAGE) as Token);
  // 响应码401，需要重新登录（或使用无感刷新token）
  if (status == 401) {
    if (!isRefreshing) {
      isRefreshing = true
      if (token) {
        // 不是登录请求 && 不是 刷新令牌的请求
        validateHeaderNeedlessToken(config.url).then(boo => {
          return new Promise((resolve) => {
            // 模拟请求时长
            setTimeout(()=>{
              // 请求刷新令牌
              refreshTokenApi(token.refreshToken).then((res)=>{
                // 这个是才后端反的data一层数据
                let result = res.data.data;
                // 生成token对象
                const newToken = new Token(result.accessToken, result.refreshToken,result.accessExpires, result.refreshExpires);
                // 设置token对象
                LocalStorageUtil.set(TOKEN_LOCAL_STORAGE, newToken);
                // 刷新token获取后，补偿本次失败的请求
                requests.forEach((cb) => cb(newToken.accessToken))
                requests = [] // 重新请求完清空
                return service(config);
              }).catch(err=>{
                console.error("抱歉，您的登录状态已失效，请重新登录！", err)
                return Promise.reject(err)
              }).finally(()=>{
                isRefreshing = false;
              })
              resolve()
            }, 5000)
          })

          console.log("2")

        })
      } else {
        // token 无效，删除缓存
        LocalStorageUtil.remove(TOKEN_LOCAL_STORAGE);
        LocalStorageUtil.remove(USER_LOCAL_STORAGE);
      }
    } else {
      // 正在刷新token，返回一个未执行resolve的promise
      return new Promise((resolve) => {
        // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
        requests.push(() => {
          config.baseURL = ''
          resolve(service(config))
        })
      })
    }
  } else if (status < 200 || status >= 400) {
    // TODO 有些接口并不希望直接弹出提示框
    // 弹出客户端提示
    ElMessage.error(result.clientMessage);
    // 打印服务端提示
    console.error(result.serverMessage);
    // 设置响应为错误，
    return Promise.reject(response);
  }

  return response;
}, (error) => {
  console.log(error);
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

export default service;


