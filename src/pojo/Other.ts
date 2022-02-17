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
  private _needElMessage: boolean = true;

  /**
   * 是否需要aes加密
   * true：使用AES加密；false：不需要使用AES加密
   */
  private _needAesEncrypt: boolean = false;
  /**
   * 是否需要使用rsa加密
   * true：使用RSA加密；false：不加密
   */
  private _needRsaEncrypt: boolean = false;

  /**
   * 需要加密的数据的key
   */
  private _needEncryptKey: object | null | undefined = null;

  /**
   * aes的密钥
   */
  private _aesKey:string | null= null;

  //~ 静态method
  //================================================================================================
  /**
   * 创建OtherBuilder对象，使用链式编程。
   */
  static builder():OtherBuilder{
    let builder = new OtherBuilder();
    return builder;
  }

  //~ 普通method
  //================================================================================================
  /**
   * 创建CustomAxiosRequestConfig对象，是AxiosRequestConfig的子类对象。
   */
  public createConfig():CustomAxiosRequestConfig{
    let customAxiosRequestConfig = new CustomAxiosRequestConfig(this);
    return customAxiosRequestConfig;
  }

  //~ constructor
  //================================================================================================
  constructor(needElMessage: boolean, needAesEncrypt: boolean, needRsaEncrypt: boolean, needEncryptKey: object | null | undefined, aesKey: string | null) {
    this._needElMessage = needElMessage;
    this._needAesEncrypt = needAesEncrypt;
    this._needRsaEncrypt = needRsaEncrypt;
    this._needEncryptKey = needEncryptKey;
    this._aesKey = aesKey;
  }

  //~ getter,setter
  //================================================================================================
  get needElMessage(): boolean {
    return this._needElMessage;
  }

  set needElMessage(value: boolean) {
    this._needElMessage = value;
  }

  get needAesEncrypt(): boolean {
    return this._needAesEncrypt;
  }

  set needAesEncrypt(value: boolean) {
    this._needAesEncrypt = value;
  }

  get needRsaEncrypt(): boolean {
    return this._needRsaEncrypt;
  }

  set needRsaEncrypt(value: boolean) {
    this._needRsaEncrypt = value;
  }

  get needEncryptKey(): object | null | undefined {
    return this._needEncryptKey;
  }

  set needEncryptKey(value: object | null | undefined) {
    this._needEncryptKey = value;
  }

  get aesKey(): string | null {
    return this._aesKey;
  }

  set aesKey(value: string | null) {
    this._aesKey = value;
  }
}

class OtherBuilder {
  /**
   * 是否需要element的错误弹出框
   */
  private _needElMessage: boolean = true;

  /**
   * 是否需要aes加密
   * true：使用AES加密；false：不需要使用AES加密
   */
  private _needAesEncrypt: boolean = false;
  /**
   * 是否需要使用rsa加密
   * true：使用RSA加密；false：不加密
   */
  private _needRsaEncrypt: boolean = false;

  /**
   * 需要加密的数据的key
   */
  private _needEncryptKey: object | null | undefined = null;

  /**
   * aes的密钥
   */
  private _aesKey:string | null= null;

  build():Other{
    let other = new Other(this._needElMessage, this._needAesEncrypt, this._needRsaEncrypt, this._needEncryptKey, this._aesKey);
    return other;
  }

  needElMessage(needElMessage:boolean):OtherBuilder{
    this._needElMessage = needElMessage;
    return this;
  }

  needAesEncrypt(needAesEncrypt:boolean):OtherBuilder{
    this._needAesEncrypt = needAesEncrypt;
    return this;
  }

  needRsaEncrypt(needRsaEncrypt:boolean):OtherBuilder{
    this._needRsaEncrypt = needRsaEncrypt;
    return this;
  }

  needEncryptKey(needEncryptKey:object | null | undefined):OtherBuilder{
    this._needEncryptKey = needEncryptKey;
    return this;
  }
  aesKey(aesKey:string|null):OtherBuilder{
    this._aesKey = aesKey;
    return this;
  }
}
