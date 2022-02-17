/** ===================认证服务相关的接口======================== */
import AxiosUtil from '@/utils/AxiosUtil';
import { AxiosResponse } from 'axios';
import {CustomAxiosRequestConfig} from "@/pojo/CustomAxiosRequestConfig";

// 认证相关请求
//==================================================================================================
/**
 * 登录
 * @param paramObj 用户对象
 */
export const loginApi = (username: string, password: string, conf?: CustomAxiosRequestConfig): Promise<AxiosResponse> => AxiosUtil.post(`/api/oauth2/authentication/login?username=${username}&password=${password}`, conf);

/**
 * 退出登录
 */
export const logoutApi = (conf?: CustomAxiosRequestConfig):Promise<AxiosResponse> => AxiosUtil.put(`/api/oauth2/authentication/logout`, conf)

/**
 * 刷新令牌
 */
export const refreshTokenApi = (refreshToken : string, conf?: CustomAxiosRequestConfig):Promise<AxiosResponse> => AxiosUtil.post(`/api/oauth2/authentication/refresh-token?refreshToken=${refreshToken}`, conf)

/**
 * 获取当前用户信息
 */
export const currentUserInfoApi = (i:number, conf?: CustomAxiosRequestConfig):Promise<AxiosResponse> => AxiosUtil.get(`/api/oauth2/authentication/current-user-info?${i}`, conf);
