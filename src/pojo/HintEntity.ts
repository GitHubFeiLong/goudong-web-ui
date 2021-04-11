/**
 * 注册页的提示信息的元数据
 */
export class HintEntity {
    // 提示信息
    info:string;
    // 字体颜色
    color:string;
    // 图标位置(使用的精灵图)
    backgroundPosition: string;
    constructor (info:string ="验证完成后，你可以使用该邮箱登录或找回密码", color:string='#c5c5c5', backgroundPosition:string='0px -100px') {
        this.info = info;
        this.color = color;
        this.backgroundPosition = backgroundPosition;
    }
    /*
        比较两个对象是否一致
    */
    equals (hint:HintEntity) {
        return this.info === hint.info;
    }
}
// 注册输入邮箱
export const EMAIL_HINT_0 = new HintEntity('验证完成后，你可以使用该邮箱登录或找回密码', '#c5c5c5', '0px -100px');
export const EMAIL_HINT_1 = new HintEntity('格式错误', '#f91', '-17px -100px');
export const EMAIL_HINT_2 = new HintEntity('请输入邮箱', '#f91', '-17px -100px');
// 邮箱验证码
export const EMAIL_CODE_HINT_0 = new HintEntity('验证码输入错误,请重新输入', '#f91', '-17px -100px');
export const EMAIL_CODE_HINT_1 = new HintEntity('请输入验证码', '#f91', '-17px -100px');
export const EMAIL_CODE_HINT_2 = new HintEntity('验证码已过期或错误，请重新获取验证码', '#f91', '-17px -100px');

// 注册输入用户名
export const USERNAME_HINT_0 = new HintEntity('支持中文、英文、数字、“-”、“_”的组合，4-20个字符', '#c5c5c5', '0px -100px');
export const USERNAME_HINT_1 = new HintEntity('格式错误，仅支持汉字、字母、数字、“-”、“_”的组合', '#f91', '-17px -100px');
export const USERNAME_HINT_01 = new HintEntity('请输入账户名', '#f91', '-17px -100px');
// 注册输入密码
export const PASSWORD_HINT_0 = new HintEntity('请将密码设置为8-20位，并且由字母，数字和符号两种以上组合', '#c5c5c5', '0px -100px');
export const PASSWORD_HINT_01 = new HintEntity('请将密码设置为8-20位，并且由字母，数字和符号两种以上组合', '#f91', '-17px -100px');
export const PASSWORD_HINT_02 = new HintEntity('请输入密码', '#f91', '-17px -100px');
export const PASSWORD_HINT_1 = new HintEntity('有被盗风险,建议使用字母、数字和符号两种及以上组合', '#f91', '-17px -134px');
export const PASSWORD_HINT_2 = new HintEntity('你的密码很安全','#c5c5c5', '-33px -134px');
export const PASSWORD_HINT_3 = new HintEntity('安全强度适中，可以使用三种以上的组合来提高安全强度','#c5c5c5', '-33px -117px');
// 注册确认密码
export const CONFIRM_PASSWORD_HINT_0 = new HintEntity('请再次输入密码','#c5c5c5', '0px -100px');
export const CONFIRM_PASSWORD_HINT_1 = new HintEntity('您两次输入的密码不同，请重试', '#f91', '-17px -100px');
