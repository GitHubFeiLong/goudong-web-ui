/** ===================用户服务相关的接口======================== */
import User from '@/pojo/User';
import { CONTENT_TYPE_0, CONTENT_TYPE_1, CONTENT_TYPE_2 } from '@/pojo/ProjectConst';
import AxiosUtil from '@/utils/AxiosUtil';
import { AxiosResponse } from 'axios';

/**
 * 检查手机号是否可用
 * @param phone 手机号
 */
export const checkRegistryPhoneApi = (phone: string): Promise<AxiosResponse> => AxiosUtil.get(`/api/user/base-user/check-registry/phone/${phone}`);

/**
 * 根据用户名，查询当前用户名是否可用，当用户名不可用时，返回三条可用用户名
 * @param username 用户名
 */
export const checkUsernameApi = (username: string): Promise<AxiosResponse> => AxiosUtil.get(`/api/user/base-user/check-registry/username/${username}`);

/**
 * 检查邮箱是否能使用，true 表示可以使用
 * @param email 邮箱
 */
export const checkEmailApi = (email: string): Promise<AxiosResponse> => AxiosUtil.get(`/api/user/base-user/check-registry/email/${email}`);

/**
 * 注册用户
 * @param paramObj 用户对象
 */
export const createUserApi = (data: User): Promise<AxiosResponse> => AxiosUtil.post('/api/user/base-user', data);

/**
 * 根据用户名，手机号，邮箱获取用户基本信息
 * @param paramObj 用户对象
 */
export const getUserByLoginNameApi = (loginName: string): Promise<AxiosResponse> => AxiosUtil.get(`/api/user/open/user/info/${loginName}`);

/**
 * 修改密码
 * @param paramObj 用户对象
 */
export const updatePasswordApi = (data: object): Promise<AxiosResponse> => AxiosUtil.patch('/api/user/base-user/password', data);

/**
 * 绑定openId
 * @param paramObj 用户对象
 */
export const updateOpenIdApi = (data: object): Promise<AxiosResponse> => AxiosUtil.patch('/api/user/open/user/bind-open-id', data);
