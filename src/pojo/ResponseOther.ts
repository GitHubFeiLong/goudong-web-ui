import Other from "@/pojo/Other";

/**
 * 类描述：
 * axios的额外参数，在响应拦截器中根据额外参数进行逻辑处理
 * 例如：
 * 1.解密后端的数据
 * 2.弹窗框样式自定义
 * @author e-Feilong.Chen
 * @date 2022/2/17 14:24
 */
export class ResponseOther extends Other{

  /**
   * 是否需要aes解密
   * true：需要；false：不需要使
   */
  private _needAesDecrypt: boolean = false;
  /**
   * 是否需要使用rsa公钥验签
   * true：需要；false：false
   */
  private _needRsaVerify: boolean = false;

  //~ 静态method
  //================================================================================================
  /**
   * 创建OtherBuilder对象，使用链式编程。
   */
  static builder():ResponseOtherBuilder{
    let builder = new ResponseOtherBuilder();
    return builder;
  }

  constructor(needAesDecrypt: boolean, needRsaVerify: boolean) {
    super();
    this._needAesDecrypt = needAesDecrypt;
    this._needRsaVerify = needRsaVerify;
  }

  get needAesDecrypt(): boolean {
    return this._needAesDecrypt;
  }

  set needAesDecrypt(value: boolean) {
    this._needAesDecrypt = value;
  }

  get needRsaVerify(): boolean {
    return this._needRsaVerify;
  }

  set needRsaVerify(value: boolean) {
    this._needRsaVerify = value;
  }
}

/**
 * {@link ResponseOther}的构建器，用来链式创建{@link ResponseOther}对象
 */
class ResponseOtherBuilder {
  build(): ResponseOther{
    return new ResponseOther(this._needAesDecrypt, this._needRsaVerify);
  }
  /**
   * 是否需要aes解密
   * true：需要；false：不需要使
   */
  private _needAesDecrypt: boolean = false;
  /**
   * 是否需要使用rsa公钥验签
   * true：需要；false：false
   */
  private _needRsaVerify: boolean = false;

  needAesDecrypt(needAesDecrypt:boolean):ResponseOtherBuilder{
    this._needAesDecrypt = needAesDecrypt;
    return this;
  }
  needRsaVerify(needRsaVerify:boolean):ResponseOtherBuilder{
    this._needRsaVerify = needRsaVerify;
    return this;
  }

}
