/** ===================用户服务相关的接口======================== */
import User from '@/pojo/User';
import AxiosUtil from '@/utils/AxiosUtil';
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {Other} from "@/pojo/Other";
import {CustomAxiosRequestConfig} from "@/pojo/CustomAxiosRequestConfig";

/**
 * 检查手机号是否可用
 * @param phone 手机号
 */
export const checkRegistryPhoneApi = (phone: string, conf?: CustomAxiosRequestConfig): Promise<AxiosResponse> => AxiosUtil.get(`/api/user/base-user/check-registry/phone/${phone}`, conf);

/**
 * 根据用户名，查询当前用户名是否可用，当用户名不可用时，返回三条可用用户名
 * @param username 用户名
 */
export const checkRegistryUsernameApi = (username: string, conf?: CustomAxiosRequestConfig): Promise<AxiosResponse> => AxiosUtil.get(`/api/user/base-user/check-registry/username/${username}`, conf);

/**
 * 检查邮箱是否能使用，true 表示可以使用
 * @param email 邮箱
 */
export const checkRegistryEmailApi = (email: string, conf?: CustomAxiosRequestConfig): Promise<AxiosResponse> => AxiosUtil.get(`/api/user/base-user/check-registry/email/${email}`, conf);

/**
 * 注册用户
 * @param paramObj 用户对象
 */
export const createUserApi = (data: User, conf?: CustomAxiosRequestConfig): Promise<AxiosResponse> => AxiosUtil.post('/api/user/base-user', data, conf);

/**
 * 根据用户名，手机号，邮箱获取用户基本信息
 * @param loginName 用户名/手机号/邮箱
 */
export const getUserByLoginNameApi = (loginName: string, conf?: CustomAxiosRequestConfig): Promise<AxiosResponse> => AxiosUtil.get(`/api/user/base-user/user-basic-info/${loginName}`, conf);

/**
 * 修改密码
 * @param paramObj 用户对象
 */
export const updatePasswordApi = (data: object, conf?: CustomAxiosRequestConfig): Promise<AxiosResponse> => AxiosUtil.patch('/api/user/base-user/password', data, conf);

/**
 * 绑定openId
 * @param paramObj 用户对象
 */
export const updateOpenIdApi = (data: object, conf?: CustomAxiosRequestConfig): Promise<AxiosResponse> => AxiosUtil.patch('/api/user/base-user/bind-open-id', data, conf);

export const demoSecrypt = (data: object, conf?: CustomAxiosRequestConfig): Promise<AxiosResponse> =>  AxiosUtil.post('/api/user/demo/secrypt', data, conf);
