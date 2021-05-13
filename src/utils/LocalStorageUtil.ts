/**
 * localStorage 封装
 */
export default class LocalStorageUtil {
  static s = window.localStorage;
  static token = "token";

  /**
   * 保存值
   * @param key
   * @param value
   */
  static set(key:string, value:any) {
    if (typeof value == 'object') {
      LocalStorageUtil.s.setItem(key, JSON.stringify(value));
    } else {
      LocalStorageUtil.s.setItem(key, value);
    }
    if (value == undefined || value == null) {
      LocalStorageUtil.s.removeItem(key);
    }
  }

  /**
   * 获取值
   * @param key
   */
  static get(key:string) {

    let item = LocalStorageUtil.s.getItem(key);
    try {
      return JSON.parse((item as any));
    } catch (e) {
      return item;
    }
  }

  /**
   * 判断是否存在key
   * @param key
   */
  static has(key:string) {
    return !!LocalStorageUtil.s.getItem(key);
  }

  /**
   * 删除值
   * @param key
   */
  static remove(key:string){
    LocalStorageUtil.s.removeItem(key);
  }
}


