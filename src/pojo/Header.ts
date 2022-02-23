/**
 * 类描述：
 * 自定义额外的请求头
 * @author e-Feilong.Chen
 * @date 2022/2/23 14:45
 */
export default class Header {
  key: string;
  value: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }
}
