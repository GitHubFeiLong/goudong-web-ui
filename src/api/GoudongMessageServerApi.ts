/** ===================消息服务相关的接口======================== */
import AxiosUtil from '@/utils/AxiosUtil';
import { AxiosResponse } from 'axios';
import CustomAxiosRequestConfig from "@/pojo/CustomAxiosRequestConfig";

/**
 * 发送手机验证码
 * @param phone 手机号
 */
export const phoneCodeApi = (phone: string, conf?: CustomAxiosRequestConfig): Promise<AxiosResponse> => AxiosUtil.post(`/api/message/code/phone-code/${phone}`, conf);

/**
 * 发送邮箱验证码
 * @param email 邮箱
 */
export const emailCodeApi = (email: string, conf?: CustomAxiosRequestConfig): Promise<AxiosResponse> => AxiosUtil.post(`/api/message/code/email-code/${email}`, conf);

/**
 * 检查手机验证是否是成功
 * @param phone 手机号
 * @param code 验证码
 */
export const checkPhoneCodeApi = (phone: string, code: string, conf?: CustomAxiosRequestConfig): Promise<AxiosResponse> => AxiosUtil.get(`/api/message/code/check-phone-code/${phone}/${code}`, conf);

/**
 * 检查邮箱验证是否是成功
 * @param email 手机号
 * @param code 验证码
 */
export const checkEmailCodeApi = (email: string, code: string, conf?: CustomAxiosRequestConfig): Promise<AxiosResponse> => AxiosUtil.get(`/api/message/code/check-email-code/${email}/${code}`, conf);
