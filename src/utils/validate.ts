/**
 * 邮箱验证
 * @param value 待验证的值
 * @param callback 回调函数
 */
function validateEmail(value:string,callback:any):boolean{
    const reg =/^([a-zA-Z0-9]+[-_.]?)+@[a-zA-Z0-9]+.[a-z]+$/;
    if(value==''||value==undefined||value==null){
        callback(new Error('请输入邮箱'));
        return false;
    } else {
        if (!reg.test(value)){
            callback(new Error('请输入正确的邮箱'));
            return false;
        } else {
            callback();
            return true;
        }
    }
}

/**
 * 验证用户名格式
 * @param value 用户名
 * @param callback 回调函数
 */
function validateUsername(value:string, callback:any):boolean{
    // 中文,英文,数字,下划线,中线
    const reg =/^([\u4E00-\u9FA5\uF900-\uFA2Da-zA-Z0-9]+[-_]?){4,20}$/;
    if(value==''||value==undefined||value==null || value.length < 4 || value.length > 20){
        callback(new Error('支持中文、英文、数字、“-”、“_”的组合，4-20个字符'));
        return false;
    } else {
        if (!reg.test(value)){
            callback(new Error('格式错误，仅支持汉字、字母、数字、“-”、“_”的组合'));
            return false;
        } else {
            callback();
            return true;
        }
    }
}

/**
 * 验证密码是否符合规则
 * @param value 密码
 * @param callback 回调函数
 */
function validatePassword(value:string, callback:any):boolean{
    // 适中 包含(数字+字母)(数字+字符)(字母+字符) 比严格的要宽，所以先执行严格的正则
    const general = /^(?=[a-zA-Z]*\d)(?=\d*[a-zA-Z])|(?=[+=]*\d)(?=\d*[+=])|(?=[a-zA-Z]*[+=])(?=[+=]*[a-zA-Z])/
    // 弱密码匹配（弱也可以注册）
    const weakly = /^(?:\d{8,20})|(?:[a-zA-Z]{8,20})|(?:[-=+_.,]{8,20})$/
    // 强密码（三种都包含）
    const strong  = /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])/
    // 基本条件
    if(value==''||value==undefined||value==null || value.length < 8 || value.length > 20){
        callback(new Error('请将密码设置为8-20位，并且由字母，数字和符号两种以上组合'));
        return false;
    }
    // 弱
    if (weakly.test(value)) {
        callback(new Error('有被盗风险,建议使用字母、数字和符号两种及以上组合'));
        return true;
    }

    // 强
    if (strong.test(value)) {
        callback(new Error('你的密码很安全'));
        return true;
    }

    // 一般
    if (general.test(value)){
        callback(new Error('安全强度适中，可以使用三种以上的组合来提高安全强度'));
        return false;
    }

    callback(new Error('未进行正则验证：' + value))
    return false;
}

export { validateEmail, validateUsername }