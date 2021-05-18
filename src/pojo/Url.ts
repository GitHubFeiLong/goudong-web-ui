import { CONTENT_TYPE_0, CONTENT_TYPE_1, CONTENT_TYPE_2 } from '@/pojo/ProjectConst';

export class Url {
  url: string;

  method: string;

  params: Array<string>;

  data: object|string = {};

  contentType = '';

  private constructor(url: string, method: string, ...params: string[]) {
    this.url = url;
    this.method = method;
    this.params = params;

    // get 请求，解析模板url
    if (method === 'get') {
      this.resolveUrl();
    }
  }

  /**
   * get 请求 使用问号传参
   * @param url 接口地址
   * @param data 请求参数
   */
  // static get (url:string, data?:object):Url {
  //   let urlObj = new Url(url, "get");
  //   urlObj.data = data as object;
  //   return urlObj;
  // }

  /**
   * get 请求 使用路径参数
   * @param url 接口地址
   * @param params 请求参数
   */
  static getByUrl(url: string, ...params: string[]): Url {
    const urlObj = new Url(url, 'get', ...params);
    return urlObj;
  }

  /**
   * post 请求
   * @param url 接口地址
   * @param data 请求参数
   * @param contentType 请求媒体类型，默认json
   */
  static post(url: string, data: object, contentType: string = CONTENT_TYPE_1): Url {
    const urlObj = new Url(url, 'post');
    urlObj.data = data;
    urlObj.contentType = contentType;
    return urlObj;
  }

  /**
   * 解析url，将模板字符串进行赋值
   * @param url
   */
  private resolveUrl() {
    console.log('resolve');
    // 正则
    const reg = /\{\w+\}/g;
    // 符合的字符串数组
    const arr = this.url.match(reg);

    // 没有模板字符，直接返回原对象
    if (arr == null) {
      return false;
    }

    // 判断数量是否相等
    if (this.params.length != arr.length) {
      console.error('Url.resolveUrl 出错：url的模板数量和参数长度不一致', this.url, this.params);
      return false;
    }

    let resultUrl = this.url;
    // 进行一对一替换模板字符串
    for (let i = 0; i < arr.length; i++) {
      resultUrl = resultUrl.replace(arr[i], this.params[i]);
    }
    // 修改url地址
    this.url = resultUrl;

    return false;
  }
}
