/** ===================文件服务相关的接口======================== */
import AxiosUtil from '@/utils/AxiosUtil';
import {AxiosResponse} from 'axios';
import CustomAxiosRequestConfig from "@/pojo/CustomAxiosRequestConfig";

export const download = (conf?: CustomAxiosRequestConfig): Promise<AxiosResponse> =>  AxiosUtil.get('/api/file/download-group/download', conf);

/**
 * 短线续传
 * @param conf
 */
export const uploadDemo = (data:object, conf?: CustomAxiosRequestConfig): Promise<AxiosResponse> =>  AxiosUtil.post('/api/file/upload-group/upload-demo', data, conf);
