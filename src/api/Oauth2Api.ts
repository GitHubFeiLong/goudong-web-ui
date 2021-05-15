/** ===================认证服务相关的接口========================*/
import {AuthorityUser} from "@/pojo/AuthorityUser";
import {CONTENT_TYPE_0, CONTENT_TYPE_1, CONTENT_TYPE_2} from "@/pojo/ProjectConst";
import AxiosUtil from '@/utils/AxiosUtil'
import {AxiosResponse} from "axios";

/**
 * 根据手机号获取用户
 * @param phone 手机号
 */
export const getUserByPhoneApi = (phone:string):Promise<AxiosResponse> => AxiosUtil.get(`/api/oauth2/open/user/phone/${phone}`);


/**
 * 根据用户名，查询当前用户名是否可用，当用户名不可用时，返回三条可用用户名
 * @param username 用户名
 */
export const checkUsernameApi = (username:string):Promise<AxiosResponse> => AxiosUtil.get(`/api/oauth2/open/user/check-username/${username}`);

/**
 * 检查邮箱是否能使用，true 表示可以使用
 * @param email 邮箱
 */
export const checkEmailApi =  (email:string):Promise<AxiosResponse> => AxiosUtil.get(`/api/oauth2/open/user/check-email/${email}`);

/**
 * 注册用户
 * @param paramObj 用户对象
 */
export const createUserApi = (data:AuthorityUser):Promise<AxiosResponse> => AxiosUtil.post(`/api/oauth2/open/user`, data);
/**
 * 登录
 * @param paramObj 用户对象
 */
// 写成接口的方式
export const loginApi = (username:string, password:string):Promise<AxiosResponse> =>  AxiosUtil.post(`/api/oauth2/user/login?username=${username}&password=${password}`);

