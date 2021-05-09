// Axios.ts
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from "element-plus";

import Result from '@/pojo/Result';

/**
 * 初始化 axios
 */
const service = axios.create({
  // 是否跨站点访问控制请求
  withCredentials: true,
  timeout: 30000,
  transformRequest: [(data) => {
    data = JSON.stringify(data)
    return data
  }],
  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function (status) {
    return true;
  },
  transformResponse: [(data) => {
    if (typeof data === 'string' && data.startsWith('{')) {
      data = JSON.parse(data)
    }
    return data
  }]

})

/**
 * 请求拦截器
 */
service.interceptors.request.use((config: AxiosRequestConfig) => {
  //获取token，并将其添加至请求头中
  let token = localStorage.getItem('token')
  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config
}, (error) => {
  console.log("请求：" + error)
  // 错误抛到业务代码
  error.data = {}
  error.data.msg = '服务器异常，请联系管理员！'
  return Promise.resolve(error)
})

/**
 * 响应拦截器
 */
service.interceptors.response.use((response: AxiosResponse<Result<any>>) => {
  // 响应码
  const status = response.status
  const result = response.data;
  if (status < 200 || status > 400) {
    // 弹出客户端提示
    ElMessage.error(result.clientMessage);
    // 打印服务端提示
    console.error(result.serverMessage);
    // 设置响应为错误，
    return Promise.reject(response);
  }

  return response
}, (error) => {
  console.log(error)
  if (axios.isCancel(error)) {
    console.log('repeated request: ' + error.message)
  } else {
    // handle error code
    // 错误抛到业务代码
    error.data = {}
    error.data.msg = '请求超时或服务器异常，请检查网络或联系管理员！'
    ElMessage.error(error.data.msg)
  }
  return Promise.reject(error)
})

export default service
