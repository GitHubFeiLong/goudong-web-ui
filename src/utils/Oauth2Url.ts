/** ===================认证服务相关的接口========================*/
import {Url} from "@/pojo/Url";
import {AuthorityUser} from "@/pojo/AuthorityUser";

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

/**
 * 检查邮箱是否能使用，true 表示可以使用
 * @param email 邮箱
 */
export const checkEmail =  (email:string):Url => new Url("/api/oauth2/user/check-email/{email}", "get", email);


/**
 * 注册用户
 * @param paramObj 用户对象
 */
export const createUser = (data:AuthorityUser):Url => Url.post("/api/oauth2/user", data);
