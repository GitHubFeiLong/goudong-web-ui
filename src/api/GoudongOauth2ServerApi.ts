/** ===================认证服务相关的接口======================== */
import AxiosUtil from '@/utils/AxiosUtil';
import { AxiosResponse } from 'axios';

/**
 * 登录
 * @param paramObj 用户对象
 */
export const loginApi = (username: string, password: string): Promise<AxiosResponse> => AxiosUtil.post(`/api/oauth2/authentication/login?username=${username}&password=${password}`);

/**
 * 退出登录
 */
export const logoutApi = ():Promise<AxiosResponse> => AxiosUtil.put(`/api/oauth2/authentication/logout`)

/**
 * 刷新令牌
 */
export const refreshTokenApi = (refreshToken : string):Promise<AxiosResponse> => AxiosUtil.post(`/api/oauth2/authentication/refresh-token?refreshToken=${refreshToken}`)
