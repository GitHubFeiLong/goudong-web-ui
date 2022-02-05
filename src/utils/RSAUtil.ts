//@ts-ignore
import { JSEncrypt } from 'encryptlong'

const PUBLIC_KEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCjue12N3M+rKyLolo5x9AoQHPm+VNYxnT1Ac31sdIqrfmxsZ8ms/STvNDpMIW0I7T15lpjnreObXRSLpBzVObZlfwE/MSRplG5edc/ujieT8q3njf9ubYsmcZFjq9qHrrc+MCdqpYvScQ4PmCge2A0mu9tk5Pb26ePzKlhLoQduQIDAQAB";

// const PRIVATE_KEY = 'MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAKO57XY3cz6srIuiWjnH0ChAc+b5U1jGdPUBzfWx0iqt+bGxnyaz9JO80OkwhbQjtPXmWmOet45tdFIukHNU5tmV/AT8xJGmUbl51z+6OJ5PyreeN/25tiyZxkWOr2oeutz4wJ2qli9JxDg+YKB7YDSa722Tk9vbp4/MqWEuhB25AgMBAAECgYApleIQssjc1HMHDHeqUWw3rRdDRXS8CbxPNuQfUck1+faAAcOQywiGNeFCOYbcWG1wP9AZmYi57mcrMJSUFq6DkadmfSIJv2DyGDQzni5cmswJFmTy7UqTjnGi1Vy0gwFBAcqUhw50srqxsaq6CHSuXMXuOpau1v/d9yVPevpMAQJBAM/q7Xnd7Mo4VjyI6tsERbh77hX2jGaW7G/1GoLs1i6c8zA0YZzfOHEFcriHHIJfFjHVJ9+cEqYZfXS0gvA11/kCQQDJlsuXj/Q5iCAD6B/+JcEugUNbzz+GCNCeX0BI0nN2Oddnmr9dm/Zd99JILFIwFMqaX2ay0Nreh4FdaW6OX2PBAkEAtasQym3Viy/Eceo0QyAthy+J7Vjafn0apAxmmMU1s87hUlpCfB4yo9Zd0cwEZgmNTAdyaphlVwpoqwNacWaqiQJBAK1IuYN0E9ysfdC95Vpi+9dM+CjgUtuVkjbA7BJtDSFQgTAm3l7KJRILaC/wIUoBZVMjtLT7QVjOJE62xXkO2EECQQCMK9R7y75IRg/GCSbRi5h4ZMwxrkfydAMOu1YgyFv3kIpqNvSK+hg62Cvb+hImMVklMGTV3mw2L+xqxo/0ma2c';
const enc = new JSEncrypt();
enc.setPublicKey(PUBLIC_KEY);
// enc.setPublicKey(PRIVATE_KEY);
/**
 * 公钥加密
 * @param data 被加密数据
 */
export function pubKeyEncrypt(data: any) {
  return enc.encryptLong(data);
}

/**
 * 公钥解密
 * @param data 被解密数据
 */
export function pubKeyDecrypt(data: any) {
  return enc.decryptLong(data)
}
