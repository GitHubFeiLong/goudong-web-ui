/** ===================认证服务相关的接口========================*/
import {Url} from "@/pojo/Url";

/**
 * 根据手机号获取用户
 * @param phone 手机号
 */
export const getUserByPhone =  (phone:string):Url => new Url("/api/oauth2/user/phone/{phone}", "get", phone);

/**
 * 根据用户名，查询当前用户名是否可用，当用户名不可用时，返回三条可用用户名
 * @param username 用户名
 */
export const checkUsername =  (username:string):Url => new Url("/api/oauth2/user/check-username/{username}", "get", username);
