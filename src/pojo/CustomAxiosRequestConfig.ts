import {
  AxiosAdapter,
  AxiosBasicCredentials, AxiosProxyConfig,
  AxiosRequestConfig,
  AxiosTransformer, CancelToken,
  Method, ResponseType, TransitionalOptions
} from "axios";
import {RequestOther} from "@/pojo/RequestOther";
import {ResponseOther} from "@/pojo/ResponseOther";

/**
 * axios额外参数对象
 * {@link CustomAxiosRequestConfig}实现{@link AxiosRequestConfig}接口, 在其上进行了补充自定义参数
 * @author msi
 */
export default class CustomAxiosRequestConfig implements AxiosRequestConfig{
  /**
   * 自定义请求参数
   * @private
   */
  _requestOther: RequestOther = RequestOther.builder().build();

  /**
   * 自定义响应参数
   * @private
   */
  _responseOther: ResponseOther = ResponseOther.builder().build();

  static build():CustomAxiosRequestConfig{
    return new CustomAxiosRequestConfig();
  }

  constructor() {
  }

  req(requestOther: RequestOther):CustomAxiosRequestConfig{
    this._requestOther = requestOther;
    return this;
  }
  res(responseOther:ResponseOther):CustomAxiosRequestConfig{
    this._responseOther = responseOther;
    return this;
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
