/** ===================文件服务相关的接口======================== */
import AxiosUtil from '@/utils/AxiosUtil';
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {ShardPrefixCheckParam} from "@/pojo/ShardPrefixCheckParam";

/**
 * 上传文件前的预检查
 * @param fileType 文件类型
 * @param fileSize 文件大小
 * @param conf axios配置
 */
export const shardPrefixCheck = (data:ShardPrefixCheckParam, conf?: AxiosRequestConfig) => AxiosUtil.post(`/api/file/upload-group/shard-prefix-check`, data, conf)


export const download = (conf?: AxiosRequestConfig): Promise<AxiosResponse> =>  AxiosUtil.get('/api/file/download-group/download', conf);

/**
 * 分片上传
 * @param formData 单次分片的参数对象（包含大小md5等详细信息）
 * @param conf axios配置
 */
export const shardUpload = (formData:FormData, conf?: AxiosRequestConfig): Promise<AxiosResponse> =>  AxiosUtil.post('/api/file/upload-group/shard-upload', formData, conf);

/**
 * 获取上传文件的文件信息
 * @param encode 文件id，先使用Base64编码再使用编码
 * @param type 0:获取文件基本信息;1:获取文件
 * @param conf
 */
export const fileLink = (fileId:bigint, type:number=1, conf?:AxiosRequestConfig): Promise<AxiosResponse> =>  AxiosUtil.get(`/api/file/file-link/${fileId}?type=${type}`, conf);
