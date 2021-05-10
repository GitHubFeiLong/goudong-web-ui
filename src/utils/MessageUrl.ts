/** ===================消息服务相关的接口========================*/
import {Url} from "@/pojo/Url";

/**
 * 手机验证码
 * @param phone 手机号
 */
export const phoneCode =  (phone:string):Url => new Url("/api/message/code/phone-code/{phone}", "get", phone);

/**
 * 邮箱验证码
 * @param email 邮箱
 */
export const emailCode =  (email:string):Url => new Url("/api/message/code/email-code/{phone}", "get", email);

/**
 * 校验验证码是否正确
 * @param number 手机号或邮箱
 * @param code 验证码
 */
export const checkCode = (number:string, code:string):Url => new Url("/api/message/code/check-code/{number}/{code}", "get", number, code);

