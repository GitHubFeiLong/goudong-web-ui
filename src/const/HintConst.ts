// 注册输入用户名
export const USERNAME_HINT_0 = '支持中文、英文、数字、“-”、“_”的组合，4-20个字符';
export const USERNAME_HINT_1 = '格式错误，仅支持汉字、字母、数字、“-”、“_”的组合';

// 注册输入密码
export const PASSWORD_HINT_0 = '请将密码设置为8-20位，并且由字母，数字和符号两种以上组合';
export const PASSWORD_HINT_1 = '有被盗风险,建议使用字母、数字和符号两种及以上组合';
export const PASSWORD_HINT_2 = '你的密码很安全';
export const PASSWORD_HINT_3 = '安全强度适中，可以使用三种以上的组合来提高安全强度';
// 注册确认密码
export const CONFIRM_PASSWORD_HINT_0 = '请再次输入密码';
export const CONFIRM_PASSWORD_HINT_1 = '您两次输入的密码不同，请重试';

class RegistHint {
    // 文字
    hint:string;
    // 字体演示
    color:string;
    // icon
    bgPosition:string;

    constructor (hint:string, color:string, bgPosition:string) {
        this.hint = hint;
        this.color = color;
        this.bgPosition = bgPosition;
    }
}

enum RegistHintEnum {
    
    
    // 文字
    hint,
    // 字体演示
    color,
    // icon
    bgPosition

    // constructor (hint:string, color:string, bgPosition:string) {
    //     this.hint = hint;
    //     this.color = color;
    //     this.bgPosition = bgPosition;
    // }
}