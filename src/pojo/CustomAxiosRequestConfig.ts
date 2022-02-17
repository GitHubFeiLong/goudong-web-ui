import {
  AxiosAdapter,
  AxiosBasicCredentials, AxiosProxyConfig,
  AxiosRequestConfig,
  AxiosTransformer, CancelToken,
  Method, ResponseType, TransitionalOptions
} from "axios";

import {Other} from '@/pojo/Other';
/**
 * axios额外参数对象
 * {@link CustomAxiosRequestConfig}实现{@link AxiosRequestConfig}接口, 在其上进行了补充自定义参数
 * @author msi
 */
export class CustomAxiosRequestConfig implements AxiosRequestConfig{
  /**
   * 自定义的其它参数
   * @private
   */
  _other: Other | null;

  public constructor(other: Other) {
    this._other = other;
  }

//~ 以下是AxiosRequestConfig属性，不能进行擅自修改
  //================================================================================================
  url?: string;
  method?: Method;
  baseURL?: string;
  transformRequest?: AxiosTransformer | AxiosTransformer[];
  transformResponse?: AxiosTransformer | AxiosTransformer[];
  headers?: any;
  params?: any;
  paramsSerializer?: (params: any) => string;
  data?: any;
  timeout?: number;
  timeoutErrorMessage?: string;
  withCredentials?: boolean;
  adapter?: AxiosAdapter;
  auth?: AxiosBasicCredentials;
  responseType?: ResponseType;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  onUploadProgress?: (progressEvent: any) => void;
  onDownloadProgress?: (progressEvent: any) => void;
  maxContentLength?: number;
  validateStatus?: ((status: number) => boolean) | null;
  maxBodyLength?: number;
  maxRedirects?: number;
  socketPath?: string | null;
  httpAgent?: any;
  httpsAgent?: any;
  proxy?: AxiosProxyConfig | false;
  cancelToken?: CancelToken;
  decompress?: boolean;
  transitional?: TransitionalOptions
}
