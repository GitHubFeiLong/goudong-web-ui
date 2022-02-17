import * as HintEntity from '@/pojo/HintEntity';

/**
 * 邮箱验证
 * @param value 待验证的值
 */
export function validateEmail(value: string): Promise<string|void> {
  return new Promise((resolve, reject) => {
    const reg = /^([a-zA-Z0-9]+[-_.]?)+@[a-zA-Z0-9]+.[a-z]+$/;
    if (value === '' || value === undefined || value === null) {
      reject(HintEntity.EMAIL_HINT_2.info);
    } else {
      if (!reg.test(value)) {
        reject(new Error('请输入正确的邮箱'));
      }
      resolve();
    }
  });
}
/**
 * 验证用户名格式
 * @param value 用户名
 */
export function validateUsername(value: string): Promise<HintEntity.HintEntity> {
  return new Promise(((resolve, reject) => {
    if (value === '' || value === undefined || value === null) {
      reject(HintEntity.USERNAME_HINT_01);
    }
    // 纯数字和纯字母
    if (/^\d+$/.test(value) || /^[a-zA-Z]+$/.test(value)) {
      reject(HintEntity.USERNAME_HINT_1);
    }
    // 中文,英文,数字,下划线,中线
    const reg = /^([\u4E00-\u9FA5\uF900-\uFA2Da-zA-Z0-9]+[-_]?){4,20}$/;

    if (reg.test(value)) {
      resolve(HintEntity.BLANK);
    }
    reject(HintEntity.USERNAME_HINT_1);
  }));
}

/**
 * 验证密码是否符合规则
 * @param value 密码
 */
export function validatePassword(value: string): Promise<HintEntity.HintEntity> {
  return new Promise(((resolve, reject) => {
    // 适中 包含(数字+字母)(数字+字符)(字母+字符) 比严格的要宽，所以先执行严格的正则
    const general = /^(?=[a-zA-Z]*\d)(?=\d*[a-zA-Z])|(?=[+-\\*/,.<>?;:'"+=-_\\(\\)\\|!@#$%^&]*\d)(?=\d*[+-\\*/,.<>?;:'"+=-_\\(\\)\\|!@#$%^&])|(?=[a-zA-Z]*[+-\\*/,.<>?;:'"+=-_\\(\\)\\|!@#$%^&])(?=[+-\\*/,.<>?;:'"+=-_\\(\\)\\|!@#$%^&]*[a-zA-Z])/;

    // 强密码（三种都包含）
    const strong = /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])/;
    // 基本条件
    if (value === '' || value === undefined || value === null || value.length < 8 || value.length > 20) {
      reject(HintEntity.PASSWORD_HINT_0);
    }
    // 弱密码匹配（弱也可以注册）
    if (/^\d{8,20}$/.test(value) || /^[a-zA-Z]{8,20}$/.test(value) || /^[+-\\*/,.<>?;:'"+=-_\\(\\)\\|!@#$%^&]{8,20}$/.test(value)) {
      resolve(HintEntity.PASSWORD_HINT_1);
    }

    // 强
    if (strong.test(value)) {
      resolve(HintEntity.PASSWORD_HINT_2);
    }

    // 一般
    if (general.test(value)) {
      resolve(HintEntity.PASSWORD_HINT_3);
    }
    reject(HintEntity.BLANK);
  }));
}

/**
 * 手机号验证
 * @param value 待验证的值
 */
export function validatePhone(value: string): Promise<string|void> {
  return new Promise((resolve, reject) => {
    const reg = /^1([358][0-9]|4[01456879]|6[2567]|7[0135678]|9[012356789])[0-9]{8}$/;
    if (value === '' || value === null) {
      reject(HintEntity.PHONE_HINT_02.info);
    } else {
      if (!reg.test(value)) {
        reject(HintEntity.PHONE_HINT_01.info);
      }
      resolve();
    }
  });
}

/**
 * 判断是否需要请求头带token的
 * @param url
 */
export function validateUrlAuthentication(url: string | undefined):Boolean {
  return !validateUrlNotAuthentication(url);
}

/**
 * 判断url不是认证相关地址（登录，刷新令牌）
 * @param url
 * @return true url不是认证地址，需要携token； false：url是认证地址，不需要带token
 */
export function validateUrlNotAuthentication(url: string | undefined):Boolean {
  // url类型是undefined直接返回
  if (url === undefined) {
    return false;
  }
  // 不是登录请求，也不是刷新token 的请求
  return !url?.startsWith("/api/oauth2/authentication/login")
    && !url?.startsWith("/api/oauth2/authentication/refresh-token")
}

/**
 * 判断字符串是否是json格式
 * @param str
 */
export function isJSON(str:string):Promise<boolean> {
  return new Promise(()=>{
    if (typeof str === 'string') {
      try {
        let obj = JSON.parse(str);
        if(typeof obj == 'object' && obj ){
          return true;
        }else{
          return false;
        }
      } catch(e) {
        console.error('error：'+str+'!!!'+e);
        return false;
      }
    }
  });
}
