/** ===================认证服务相关的接口======================== */
import AuthorityUser from '@/pojo/AuthorityUser';
import { CONTENT_TYPE_0, CONTENT_TYPE_1, CONTENT_TYPE_2 } from '@/pojo/ProjectConst';
import AxiosUtil from '@/utils/AxiosUtil';
import { AxiosResponse } from 'axios';


/**
 * 登录
 * @param paramObj 用户对象
 */
export const loginApi = (username: string, password: string): Promise<AxiosResponse> => AxiosUtil.post(`/api/oauth2/login/login?username=${username}&password=${password}`);

/**
 * 退出登录
 */
export const logoutApi = ():Promise<AxiosResponse> => AxiosUtil.put(`/api/user/user/logout`)
