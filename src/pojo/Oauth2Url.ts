/** ===================认证服务相关的接口========================*/
import {Url} from "@/pojo/Url";

/**
 * 根据手机号获取用户
 * @param phone 手机号
 */
export const getUserByPhone =  (phone:string):Url => new Url("/api/oauth2/user/phone/{phone}", "get", phone);
