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

// 声明goudong-java的encrypt对象
const serverJsEncrypt = new JSEncrypt();

serverJsEncrypt.setKey(SERVER_PUBLIC_KEY);

/**
 * 客户端公钥
 */
const CLIENT_PUBLIC_KEY = `-----BEGIN RSA PUBLIC KEY-----
MIGJAoGBAJTgJnQm3RiVYjr3Bn5O3mJr1qFiCXxps2LWoEj4RyAXMsQSuCKLk9QY
hQTqnr5mO21JTtASi1BhkbzAU0MGGtLO5qMReebqq4T35wgZQI3kh//Zg0QEkkBS
wydyrAQy0KuVbOiSfh8JoqOQC2KJMRsTxshXptPGt4oZ0mLURUtxAgMBAAE=
-----END RSA PUBLIC KEY-----`;

/**
 * 客户端私钥
 */
const CLIENT_PRIVATE_KEY =
`-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCU4CZ0Jt0YlWI69wZ+Tt5ia9ahYgl8abNi1qBI+EcgFzLEErgi
i5PUGIUE6p6+ZjttSU7QEotQYZG8wFNDBhrSzuajEXnm6quE9+cIGUCN5If/2YNE
BJJAUsMncqwEMtCrlWzokn4fCaKjkAtiiTEbE8bIV6bTxreKGdJi1EVLcQIDAQAB
AoGBAJQLTtIEb6rpqlQ+oAtsvIKdAENdrVc1+XgZPC00D+6egxIuF0PrDudENssL
0S4/lWr5ElGhjz4wuG89xc6JvJNPc5cvdoi7thstRACo5YWE2HESlmjJtZjxcM9w
L9evdrofjLlb+BqSC9u/5DN3pumSMUL0stBpYfmeVAc+AImdAkEAxeF4LYD4h0sk
ig+FuZlEyVJ1JtMLOsDROTNwSoNymyyMc5Po6jj97213eeDazuaARPH/a+VbhY2w
mOEkbzZHswJBAMCaA3m4uKSAZC/T6VGH+ApCaiI6xfT5lLAdnpom0TkO2rkItcY8
ZBqWSMBJIgBmLufhqyRWX3KY8eZsSUGDjksCQFilVAAWib+aMwlCQObPOZhyvxag
bqRoYpIccA6BamMHhvfz5+CdnWyX/nD0ATG04vt/6au9OM3Qlq82FOtZRq8CQEDS
VQMdiX9L+uwh7S/UjEWfrqrQjxlw+nr/rQaCs/35IuINrWgHoUVVeSzGMFxkB7th
N0FmlH80PI3pugoDpdsCQEnJ252o+0vvALjCJJjw719avvX+EBNeDH6ConH3kg2g
z3qWx15rgov2o1jmT36d9/yiR4Bxgb9f6DFgIrWrwgs=
-----END RSA PRIVATE KEY-----`;

// 声明goudong-web-ui的encrypt对象
const clientJsEncrypt = new JSEncrypt();
clientJsEncrypt.setPublicKey(CLIENT_PUBLIC_KEY);
clientJsEncrypt.setPrivateKey(CLIENT_PRIVATE_KEY);

//~客户端相关
//==================================================================================================
/**
 * 使用客户端公钥加密
 * 防止中文加密解密出现问题，使用Base64先进行编码，解密后再进行节码。
 * @param data 加密前的字符串
 * @return result 加密后的字符串
 */
export function clientPublicKeyEncrypt(data: string) {
  let result = clientJsEncrypt.encryptLong(Base64.encode(data));
  return result;
}

/**
 * 使用客户端公钥解密
 * 加密时先使用Base64编码，所以这里需要先解码再解密
 * @see clientPublicKeyEncrypt
 * @param data 解密前的字符串
 * @return result 解密后的字符串
 */
export function clientPublicDecrypt(data: string) {
  let result = Base64.decode(clientJsEncrypt.decryptLong(data));
  return result;
}

/**
 * 使用客户端私钥加密
 * 防止中文加密解密出现问题，使用Base64先进行编码，解密后再进行节码。
 * @param data 加密前的字符串
 * @return result 加密后的字符串
 */
export function clientPrivateKeyEncrypt(data: string) {
  let result = clientJsEncrypt.encryptLong(Base64.encode(data));
  return result;
}

/**
 * 使用客户端私钥解密
 * 加密时先使用Base64编码，所以这里需要先解码再解密
 * @see clientPrivateKeyEncrypt
 * @param data 解密前的字符串
 * @return result 解密后的字符串
 */
export function clientPrivateKeyDecrypt(data: string) {
  let result = Base64.decode(clientJsEncrypt.decryptLong(data));
  return result;
}

//~ 服务端相关
//==================================================================================================
/**
 *
 *
 * 加密后的的字符串内部使用了encode编码，所以后端需要先解码在解密
 * @param data 使用Base64编码后的加密数据
 */
/**
 * 使用服务端公钥加密
 * 防止中文加密解密出现问题，使用Base64先进行编码，解密后再进行节码。
 * @param data 加密前的字符串
 * @return result 加密后的字符串
 */
export function serverPublicKeyEncrypt(data: string) {
  return serverJsEncrypt.encryptLong(data);
}

/**
 * 使用服务端公钥解密
 * 防止中文加密解密出现问题，使用Base64先进行编码，解密后再进行节码。
 * @param data 解密前的字符串
 * @return result 解密后的字符串
 */
export function serverPublicKeyDecrypt(data: string) {
  return serverJsEncrypt.decryptLong(data);
}
