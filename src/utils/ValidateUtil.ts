import * as HintEntity from '@/pojo/HintEntity';

/**
 * 邮箱验证
 * @param value 待验证的值
 */
function validateEmail(value:string):Promise<String|void>{

    return new Promise((resolve, reject) => {
        const reg =/^([a-zA-Z0-9]+[-_.]?)+@[a-zA-Z0-9]+.[a-z]+$/;
        if(value==''||value==undefined||value==null){
            reject(HintEntity.EMAIL_HINT_2.info)
        } else {
            if (!reg.test(value)){
                reject('请输入正确的邮箱')
            }
            resolve();
        }
    });
}
/**
 * 验证用户名格式
 * @param value 用户名
 */
function validateUsername(value:string):Promise<HintEntity.HintEntity>{

  return new Promise(((resolve, reject) => {
    if(value==''||value==undefined||value==null){
      reject(HintEntity.USERNAME_HINT_01);
    }
    // 纯数字和纯字母
    if (/^\d+$/.test(value) || /^[a-zA-Z]+$/.test(value)) {
      reject(HintEntity.USERNAME_HINT_1);
    }
    // 中文,英文,数字,下划线,中线
    const reg =/^([\u4E00-\u9FA5\uF900-\uFA2Da-zA-Z0-9]+[-_]?){4,20}$/;

    if (reg.test(value)){
      resolve(HintEntity.BLANK);
    }
    reject(HintEntity.USERNAME_HINT_1);
  }))
}

/**
 * 验证密码是否符合规则
 * @param value 密码
 */
function validatePassword(value:string):Promise<HintEntity.HintEntity>{

  return new Promise(((resolve, reject) => {
    // 适中 包含(数字+字母)(数字+字符)(字母+字符) 比严格的要宽，所以先执行严格的正则
    const general = /^(?=[a-zA-Z]*\d)(?=\d*[a-zA-Z])|(?=[+-\\*/,.<>?;:'"+=-_\\(\\)\\|!@#$%^&]*\d)(?=\d*[+-\\*/,.<>?;:'"+=-_\\(\\)\\|!@#$%^&])|(?=[a-zA-Z]*[+-\\*/,.<>?;:'"+=-_\\(\\)\\|!@#$%^&])(?=[+-\\*/,.<>?;:'"+=-_\\(\\)\\|!@#$%^&]*[a-zA-Z])/

    // 强密码（三种都包含）
    const strong  = /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])/
    // 基本条件
    if(value==''||value==undefined||value==null || value.length < 8 || value.length > 20){
      reject(HintEntity.PASSWORD_HINT_0)
    }
    // 弱密码匹配（弱也可以注册）
    if (/^\d{8,20}$/.test(value) || /^[a-zA-Z]{8,20}$/.test(value) ||  /^[+-\\*/,.<>?;:'"+=-_\\(\\)\\|!@#$%^&]{8,20}$/.test(value) ) {
      resolve(HintEntity.PASSWORD_HINT_1)
    }

    // 强
    if (strong.test(value)) {
      resolve(HintEntity.PASSWORD_HINT_2)
    }

    // 一般
    if (general.test(value)){
      resolve(HintEntity.PASSWORD_HINT_3)
    }
    reject(HintEntity.BLANK)
  }));
}

/**
 * 手机号验证
 * @param value 待验证的值
 */
function validatePhone(value:string):Promise<String|void>{

  return new Promise((resolve, reject) => {
    const reg =/^1([358][0-9]|4[01456879]|6[2567]|7[0135678]|9[012356789])[0-9]{8}$/;
    if(value == '' || value == null){
      reject(HintEntity.PHONE_HINT_02.info)
    } else {
      if (!reg.test(value)){
        reject(HintEntity.PHONE_HINT_01.info)
      }
      resolve();
    }
  });
}

export { validateEmail, validateUsername, validatePassword, validatePhone }
