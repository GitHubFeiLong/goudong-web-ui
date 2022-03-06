/** ===================文件服务相关的接口======================== */
import AxiosUtil from '@/utils/AxiosUtil';
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import CustomAxiosRequestConfig from "@/pojo/CustomAxiosRequestConfig";

export const download = (conf?: AxiosRequestConfig): Promise<AxiosResponse> =>  AxiosUtil.get('/api/file/download-group/download', conf);

/**
 * 短线续传
 * @param conf
 */
export const shardUpload = (formData:FormData, conf?: AxiosRequestConfig): Promise<AxiosResponse> =>  AxiosUtil.post('/api/file/upload-group/shard-upload', formData, conf);
