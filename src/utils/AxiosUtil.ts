// Axios.ts
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';

import Result from '@/pojo/Result';
import { AUTHORIZATION, USER_LOCAL_STORAGE } from '@/pojo/ProjectConst';
import LocalStorageUtil from '@/utils/LocalStorageUtil';
import AuthorityUser from '@/pojo/AuthorityUser';

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
  const token = LocalStorageUtil.get(AUTHORIZATION);
  if (token) {
    config.headers[AUTHORIZATION.toLowerCase()] = token;
  }
  return config;
}, (error) => {
  console.log(`请求：${error}`);
  // 错误抛到业务代码
  error.data = {};
  error.data.msg = '服务器异常，请联系管理员！';
  return Promise.resolve(error);
});

/**
 * 响应拦截器
 */
service.interceptors.response.use((response: AxiosResponse<Result<any>>) => {
  console.log(response);
  // 响应码
  const { status } = response;
  const result = response.data;
  // 响应码401，需要重新登录
  if (status == 401) {
    // 清除 token
    LocalStorageUtil.remove(AUTHORIZATION);
    // 清除 用户信息
    LocalStorageUtil.remove(USER_LOCAL_STORAGE);
  }

  if (status < 200 || status >= 400) {
    // 弹出客户端提示
    ElMessage.error(result.clientMessage);
    // 打印服务端提示
    console.error(result.serverMessage);
    // 设置响应为错误，
    return Promise.reject(response);
  }

  // 响应头有token，那就更新本地token值
  if (response.headers[AUTHORIZATION.toLowerCase()]) {
    LocalStorageUtil.set(AUTHORIZATION, response.headers[AUTHORIZATION.toLowerCase()]);
  }

  // 登录接口，保存用户信息
  if (response.config.url?.startsWith('/api/oauth2/user/login')) {
    LocalStorageUtil.set(USER_LOCAL_STORAGE, response.data.data);
  }

  return response;
}, (error) => {
  console.log(error);
  if (axios.isCancel(error)) {
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
