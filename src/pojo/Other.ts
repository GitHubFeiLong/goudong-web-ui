import {CustomAxiosRequestConfig} from "@/pojo/CustomAxiosRequestConfig";

/**
 * axios的额外参数，用来在请求拦截器和响应拦截器中处理
 *
 * @see CustomAxiosRequestConfig
 * @author msi
 * @version 1.0.0
 */
export class Other{
  /**
   * 是否需要element的错误弹出框
   */
  _needElMessage: boolean = true;

  /**
   * 是否需要aes加密
   * true：使用AES加密；false：不需要使用AES加密
   */
  _needAesEncrypt: boolean = false;
  /**
   * 是否需要使用rsa加密
   * true：使用RSA加密；false：不加密
   */
  _needRsaEncrypt: boolean = false;

  /**
   * 需要加密的数据
   */
  _needEncryptKey: object | null | undefined = null;

  static build():Other{
    let other = new Other();
    return other;
  }

  private constructor() {
  }

  createConfig():CustomAxiosRequestConfig{
    let customAxiosRequestConfig = new CustomAxiosRequestConfig(this);
    return customAxiosRequestConfig;
  }

  needElMessage(needElMessage:boolean):Other{
    this._needElMessage = needElMessage;
    return this;
  }

  needAesEncrypt(needAesEncrypt:boolean):Other{
    this._needAesEncrypt = needAesEncrypt;
    return this;
  }

  needRsaEncrypt(needRsaEncrypt:boolean):Other{
    this._needRsaEncrypt = needRsaEncrypt;
    return this;
  }

  needEncryptKey(needEncryptKey:object | null | undefined):Other{
    this._needEncryptKey = needEncryptKey;
    return this;
  }

}
