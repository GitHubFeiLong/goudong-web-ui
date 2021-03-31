import * as HintEntity from '@/pojo/HintEntity';

/**
 * 邮箱验证
 * @param value 待验证的值
 */
function validateEmail(value:string):Promise<String|void>{
    
    return new Promise((resolve, reject) => {
        const reg =/^([a-zA-Z0-9]+[-_.]?)+@[a-zA-Z0-9]+.[a-z]+$/;
        if(value==''||value==undefined||value==null){
            reject('请输入邮箱')
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
 * @param callback 回调函数
 */
function validateUsername(value:string, callback:any):boolean{
    // 中文,英文,数字,下划线,中线
    const reg =/^([\u4E00-\u9FA5\uF900-\uFA2Da-zA-Z0-9]+[-_]?){4,20}$/;
    if(value==''||value==undefined||value==null){
        callback(new Error(HintEntity.USERNAME_HINT_0.info));
        return false;
    }
   
    if (reg.test(value)){
        callback();
        return true;
    }
    callback(new Error(HintEntity.USERNAME_HINT_1.info));
    return false;
}

/**
 * 验证密码是否符合规则
 * @param value 密码
 * @param callback 回调函数
 */
function validatePassword(value:string, callback:any):boolean{
    // 适中 包含(数字+字母)(数字+字符)(字母+字符) 比严格的要宽，所以先执行严格的正则
const general = /^(?=[a-zA-Z]*\d)(?=\d*[a-zA-Z])|(?=[+-\\*/,.<>?;:'"+=-_\\(\\)\\|!@#$%^&]*\d)(?=\d*[+-\\*/,.<>?;:'"+=-_\\(\\)\\|!@#$%^&])|(?=[a-zA-Z]*[+-\\*/,.<>?;:'"+=-_\\(\\)\\|!@#$%^&])(?=[+-\\*/,.<>?;:'"+=-_\\(\\)\\|!@#$%^&]*[a-zA-Z])/
    
    // 强密码（三种都包含）
    const strong  = /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])/
    // 基本条件
    if(value==''||value==undefined||value==null || value.length < 8 || value.length > 20){
        callback(new Error(HintEntity.PASSWORD_HINT_0.info));
        return false;
    }
    // 弱密码匹配（弱也可以注册）
    if (/^\d{8,20}$/.test(value) || /^[a-zA-Z]{8,20}$/.test(value) ||  /^[+-\\*/,.<>?;:'"+=-_\\(\\)\\|!@#$%^&]{8,20}$/.test(value) ) {
        callback(new Error(HintEntity.PASSWORD_HINT_1.info));
        return true;
    }

    // 强
    if (strong.test(value)) {
        callback(new Error(HintEntity.PASSWORD_HINT_2.info));
        return true;
    }

    // 一般
    if (general.test(value)){
        callback(new Error(HintEntity.PASSWORD_HINT_3.info));
        return true;
    }

    callback(new Error('未进行正则验证：' + value))
    return false;
}

export { validateEmail, validateUsername, validatePassword }