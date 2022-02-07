/**
 * 使用RSA加密解密（暂时不使用分段加密解密，原因：性能较差，安全性较高。只在特殊场景使用，比如支付时）
 */
// import JSEncrypt from 'jsencrypt'
/**
 * encryptlong 分段加密，分段解密
 */
//@ts-ignore
import { JSEncrypt } from 'encryptlong'
import {Base64} from 'js-base64';

/**
 * 服务端公钥
 */
const SERVER_PUBLIC_KEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCjue12N3M+rKyLolo5x9AoQHPm+VNYxnT1Ac31sdIqrfmxsZ8ms/STvNDpMIW0I7T15lpjnreObXRSLpBzVObZlfwE/MSRplG5edc/ujieT8q3njf9ubYsmcZFjq9qHrrc+MCdqpYvScQ4PmCge2A0mu9tk5Pb26ePzKlhLoQduQIDAQAB";
const SERVER_PRIVATE_KEY = "MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAKO57XY3cz6srIuiWjnH0ChAc+b5U1jGdPUBzfWx0iqt+bGxnyaz9JO80OkwhbQjtPXmWmOet45tdFIukHNU5tmV/AT8xJGmUbl51z+6OJ5PyreeN/25tiyZxkWOr2oeutz4wJ2qli9JxDg+YKB7YDSa722Tk9vbp4/MqWEuhB25AgMBAAECgYApleIQssjc1HMHDHeqUWw3rRdDRXS8CbxPNuQfUck1+faAAcOQywiGNeFCOYbcWG1wP9AZmYi57mcrMJSUFq6DkadmfSIJv2DyGDQzni5cmswJFmTy7UqTjnGi1Vy0gwFBAcqUhw50srqxsaq6CHSuXMXuOpau1v/d9yVPevpMAQJBAM/q7Xnd7Mo4VjyI6tsERbh77hX2jGaW7G/1GoLs1i6c8zA0YZzfOHEFcriHHIJfFjHVJ9+cEqYZfXS0gvA11/kCQQDJlsuXj/Q5iCAD6B/+JcEugUNbzz+GCNCeX0BI0nN2Oddnmr9dm/Zd99JILFIwFMqaX2ay0Nreh4FdaW6OX2PBAkEAtasQym3Viy/Eceo0QyAthy+J7Vjafn0apAxmmMU1s87hUlpCfB4yo9Zd0cwEZgmNTAdyaphlVwpoqwNacWaqiQJBAK1IuYN0E9ysfdC95Vpi+9dM+CjgUtuVkjbA7BJtDSFQgTAm3l7KJRILaC/wIUoBZVMjtLT7QVjOJE62xXkO2EECQQCMK9R7y75IRg/GCSbRi5h4ZMwxrkfydAMOu1YgyFv3kIpqNvSK+hg62Cvb+hImMVklMGTV3mw2L+xqxo/0ma2c";

// 声明goudong-java的encrypt对象
const serverJsEncrypt = new JSEncrypt();
serverJsEncrypt.setPublicKey(SERVER_PUBLIC_KEY);
serverJsEncrypt.setPrivateKey(SERVER_PRIVATE_KEY)
/**
 * 客户端公钥
 */
const UI_PUBLIC_KEY = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDMs43erPTKo6nHyK1Gq8+5YSzHYbIb1CyAJh3nZanss1ovt84RxiUMhj4N1wsl2aHBomyoNOh67BDbVYBElnmz8bCUsvFO8BHSK60guGOJo6ac5w37mVkSK9YH64kVQwrnjPp6tbjHRsEV5uMQrRtB1VQWbWVCjdBeyRgo9oe+qQIDAQAB`;

/**
 * 客户端私钥
 */
const UI_PRIVATE_KEY = `MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAMyzjd6s9MqjqcfIrUarz7lhLMdhshvULIAmHedlqeyzWi+3zhHGJQyGPg3XCyXZocGibKg06HrsENtVgESWebPxsJSy8U7wEdIrrSC4Y4mjppznDfuZWRIr1gfriRVDCueM+nq1uMdGwRXm4xCtG0HVVBZtZUKN0F7JGCj2h76pAgMBAAECgYEAltgBxYOiZ+ku5aAFwDw/uJXZT5u4ijVSDaUJCEmsbFbGML+7xPFEv/P0qnI7LssvHee5NkK2xk5LJbXd7a0NRLFPPSBjb086VynbTVHvbe0fyYjilmVNkZocHlgXSFrOVVsPIherapMbMJn2WMFm6+WBOJ+gZBMMV0dNbgbUfQECQQDtLvWKLt4wlsJu0dpRc7k7uS5l6trpiorieX+sC/0GvJX4yY+CovwmNcsRoejRnyz5gpLRCVTsQ62IXQtqG5xZAkEA3PDn4OMuH4jEduH1XdNvGbAulUI3PLmjZLnbWpayC4YSgyw3UNNZ4yPfvSQijBcM+rS4GG+2cQCGceiZtDqq0QJBALUKaxGWxLKB4NeGBwa1NmaH6wqQQZiRz4EfDHzeibxipnbII2qrzZu848wJshSPU10AdeBpJxFQd1zm6JeNi8ECQF0yrc16Z1FcAuvXAwayErJ2VCAYD27pK9hoYfRDjxU3WAXHGApbLRaYYl/Jp10KuCnlI6cDMKVYQF46bOPOv5ECQQCin5UCSNHkNVhOtSrVD4E7zOjsB69EDkETtdSfDAkMQTW6U5mL2ygl4kghgEHZJihXKVjTz2ATeDHqMHuxPNX0`;

// 声明goudong-web-ui的encrypt对象
const UiJsEncrypt = new JSEncrypt();
UiJsEncrypt.setPublicKey(UI_PUBLIC_KEY);
UiJsEncrypt.setPrivateKey(UI_PRIVATE_KEY);

//~客户端相关
//==================================================================================================
/**
 * 使用客户端公钥加密
 * 防止中文加密解密出现问题，使用Base64先进行编码，解密后再进行节码。
 * @param data 加密前的字符串
 * @return result 加密后的字符串
 */
export function uiPublicKeyEncrypt(data: string) {
  let result = UiJsEncrypt.encryptLong(Base64.encode(data));
  return result;
}

/**
 * 使用客户端公钥解密
 * 加密时先使用Base64编码，所以这里需要先解码再解密
 * @see uiPublicKeyEncrypt
 * @param data 解密前的字符串
 * @return result 解密后的字符串
 */
export function uiPublicDecrypt(data: string) {
  let result = Base64.decode(UiJsEncrypt.decryptLong(data));
  return result;
}

/**
 * 使用客户端私钥加密
 * 防止中文加密解密出现问题，使用Base64先进行编码，解密后再进行节码。
 * @param data 加密前的字符串
 * @return result 加密后的字符串
 */
export function uiPrivateKeyEncrypt(data: string) {
  let result = UiJsEncrypt.encryptLong(Base64.encode(data));
  return result;
}

/**
 * 使用客户端私钥解密
 * 加密时先使用Base64编码，所以这里需要先解码再解密
 * @see uiPrivateKeyEncrypt
 * @param data 解密前的字符串
 * @return result 解密后的字符串
 */
export function uiPrivateKeyDecrypt(data: string) {
  let result = Base64.decode(UiJsEncrypt.decryptLong(data));
  return result;
}

//~ 服务端相关
//==================================================================================================
/**
 * 使用服务端公钥加密
 * 防止中文加密解密出现问题，使用Base64先进行编码，解密后再进行节码。
 * @param data 加密前的字符串
 * @return result 加密后的字符串
 */
export function serverPublicKeyEncrypt(data: string) {
  return serverJsEncrypt.encryptLong(Base64.encode(data));
}

/**
 * 使用服务端公钥加密
 * 防止中文加密解密出现问题，使用Base64先进行编码，解密后再进行节码。
 * @param data 加密前的字符串
 * @return result 加密后的字符串
 */
export function serverPrivateKeyEncrypt(data: string) {
  return serverJsEncrypt.encryptLong(Base64.encode(data));
}
/**
 * 使用服务端公钥解密
 * 防止中文加密解密出现问题，使用Base64先进行编码，解密后再进行节码。
 * @param data 解密前的字符串
 * @return result 解密后的字符串
 */
export function serverPublicKeyDecrypt(data: string) {
  return Base64.decode(serverJsEncrypt.decryptLong(data));
}

export function serverPrivateKeyDecrypt(data: string) {
  return Base64.decode(serverJsEncrypt.decryptLong(data));
}
