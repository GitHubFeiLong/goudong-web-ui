/**
 * 请求头
 */
export const AUTHORIZATION = 'Authorization';
/**
 * 认证请求头开头
 */
export const BEARER = 'Bearer ';

/**
 * 请求媒体类型
 */
export const CONTENT_TYPE_0 = 'application/x-www-form-urlencoded';
export const CONTENT_TYPE_1 = 'application/json;charset=UTF-8';
export const CONTENT_TYPE_2 = 'multipart/form-data';

/**
 * 用户的基本信息存储到本地
 */
export const USER_LOCAL_STORAGE = 'user';
/**
 * 保存令牌信息
 */
export const TOKEN_LOCAL_STORAGE = 'token';

/**
 * 处理服务器返回的401请求的一个全局变量，用于刷新token获取等操作
 * 对应的值参考枚举{@link Dispose401StatusEnum}
 */
export const DISPOSE_401_STATUS = "dispose_401_status"
