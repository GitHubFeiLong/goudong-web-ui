/**
 * 使用RSA加密解密（暂时不使用分段加密解密，原因：性能较差，安全性较高。只在特殊场景使用，比如支付时）
 */
import JSEncrypt from 'jsencrypt'
/**
 * encryptlong 分段加密，分段解密
 */
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

//~ 服务端相关
//==================================================================================================
/**
 * 使用服务端公钥加密
 * 防止中文加密解密出现问题，使用Base64先进行编码，解密后再进行节码。
 * @param data 加密前的字符串
 * @return result 加密后的字符串
 */
export function serverPublicKeyEncrypt(data: any) {
  return serverJsEncrypt.encrypt(Base64.encode(data));
}

/**
 * 使用服务端公钥加密
 * 防止中文加密解密出现问题，使用Base64先进行编码，解密后再进行节码。
 * @param data 加密前的字符串
 * @return result 加密后的字符串
 */
export function serverPrivateKeyEncrypt(data: any) {
  const jsEncrypt = new JSEncrypt();
  jsEncrypt.setPrivateKey(SERVER_PRIVATE_KEY)
  return jsEncrypt.encrypt(data);
}
/**
 * 使用服务端公钥解密
 * 防止中文加密解密出现问题，使用Base64先进行编码，解密后再进行节码。
 * @param data 解密前的字符串
 * @return result 解密后的字符串
 */
export function serverPublicKeyDecrypt(data: any) {
  const jsEncrypt = new JSEncrypt();
  jsEncrypt.setPublicKey(SERVER_PUBLIC_KEY)
  return jsEncrypt.decrypt(data);
  // return serverJsEncrypt.decrypt(Base64.decode(data));
  // return Base64.decode(<string>serverJsEncrypt.decrypt(data));
}

export function serverPrivateKeyDecrypt(data: any) {
  return Base64.decode(<string>serverJsEncrypt.decrypt(data));
}
