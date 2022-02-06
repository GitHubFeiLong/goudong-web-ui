//@ts-ignore
import { JSEncrypt } from 'encryptlong'
import {Base64} from 'js-base64';
// let Base64 = require('js-base64').Base64
let PUBLIC_KEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCjue12N3M+rKyLolo5x9AoQHPm+VNYxnT1Ac31sdIqrfmxsZ8ms/STvNDpMIW0I7T15lpjnreObXRSLpBzVObZlfwE/MSRplG5edc/ujieT8q3njf9ubYsmcZFjq9qHrrc+MCdqpYvScQ4PmCge2A0mu9tk5Pb26ePzKlhLoQduQIDAQAB";
// PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----${PUBLIC_KEY}-----END PUBLIC KEY-----`
// const PRIVATE_KEY = 'MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAKO57XY3cz6srIuiWjnH0ChAc+b5U1jGdPUBzfWx0iqt+bGxnyaz9JO80OkwhbQjtPXmWmOet45tdFIukHNU5tmV/AT8xJGmUbl51z+6OJ5PyreeN/25tiyZxkWOr2oeutz4wJ2qli9JxDg+YKB7YDSa722Tk9vbp4/MqWEuhB25AgMBAAECgYApleIQssjc1HMHDHeqUWw3rRdDRXS8CbxPNuQfUck1+faAAcOQywiGNeFCOYbcWG1wP9AZmYi57mcrMJSUFq6DkadmfSIJv2DyGDQzni5cmswJFmTy7UqTjnGi1Vy0gwFBAcqUhw50srqxsaq6CHSuXMXuOpau1v/d9yVPevpMAQJBAM/q7Xnd7Mo4VjyI6tsERbh77hX2jGaW7G/1GoLs1i6c8zA0YZzfOHEFcriHHIJfFjHVJ9+cEqYZfXS0gvA11/kCQQDJlsuXj/Q5iCAD6B/+JcEugUNbzz+GCNCeX0BI0nN2Oddnmr9dm/Zd99JILFIwFMqaX2ay0Nreh4FdaW6OX2PBAkEAtasQym3Viy/Eceo0QyAthy+J7Vjafn0apAxmmMU1s87hUlpCfB4yo9Zd0cwEZgmNTAdyaphlVwpoqwNacWaqiQJBAK1IuYN0E9ysfdC95Vpi+9dM+CjgUtuVkjbA7BJtDSFQgTAm3l7KJRILaC/wIUoBZVMjtLT7QVjOJE62xXkO2EECQQCMK9R7y75IRg/GCSbRi5h4ZMwxrkfydAMOu1YgyFv3kIpqNvSK+hg62Cvb+hImMVklMGTV3mw2L+xqxo/0ma2c';
const enc = new JSEncrypt();
enc.setKey(PUBLIC_KEY);
// enc.setKey(window.atob(PUBLIC_KEY));
// enc.setPublicKey(PRIVATE_KEY);
/**
 * 公钥加密
 *
 * 加密后的的字符串内部使用了encode编码，所以后端需要先解码在解密
 * @param data 被加密数据
 */
export function pubKeyEncrypt(data: any) {
  return enc.encryptLong(data);
  // return enc.encrypt(data);
}

/**
 * 公钥解密
 * @param data 被解密数据
 */
export function pubKeyDecrypt(str: any) {
  // return enc.decryptLong(data)
  let a = "kJjz9XUo6AulEXaYcYi+8JL5UazWevtxqkYxt2/3gIy/MAA3Eh03hUVWWGd0VwX+z5ITWjleyK6AYg+vnCESFV5WxKldQ0MinHOqrUXNl2a9zy4ypwozFDfVXCyV2rahIimDduO7ZcVDGmISLMgjAOwLYhBZuicOzEHbYR2nX7k=";
  console.log("解密1：", enc.decrypt(a))
  console.log("解密1：", enc.decrypt(window.btoa(a)))
  console.log("解密2：", enc.decrypt(window.atob(a)))
  // return enc.decrypt(data)
}
