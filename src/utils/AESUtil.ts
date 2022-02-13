/**
 * 自定义AES工具。
 * 跟java对接AES的加密解密等操作，所以这里适合全局使用。如有特殊情况再添加相应的方法，但是方法命名需要分明
 * 注意：
 * 1、因为根java对接AES，所以这里的密钥和iv偏移量不写死，并暂时不使用密钥偏移量。
 * 2、CryptoJS.enc.Utf8.parse(key) 不能重复使用，否则解密不出来数据
 * 使用方式：
 * @author msi
 * @version 1.0.0
 */
const CryptoJS = require('crypto-js');  //引用AES源码js

/**
 * 生成AES的key，默认16位
 * @param length
 */
export function generateKey (length:number = 16) {
  let random = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let str = "";
  for (let i = 0; i < length; i++) {
    str  = str + random.charAt(Math.random() * random.length)
  }
  return str;
}

/**
 * 加密
 * @param data
 * @param key
 */
export function encrypt(data: string, key: string) {
  let dataWordArray = CryptoJS.enc.Utf8.parse(data);
  let encrypted = CryptoJS.AES.encrypt(dataWordArray, CryptoJS.enc.Utf8.parse(key), {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
  // Base64编码的字符串（encrypted.ciphertext.toString() 16进制的字符串）
  return encrypted.toString();

}

/**
 * 解密后端返回的加密数据
 * @param word
 * @param key
 */
export function decrypt(data: string, key: string) {
  let decrypt = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}
