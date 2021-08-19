/**
 * 用户信息对象
 */
export default class AuthorityUser {
  // 用户表主键id
  id: string ="";
  // 用户名
  username: string | undefined ='';

  // 密码
  password: string | undefined ='';

  // 邮箱
  email: string | undefined ='';

  // 手机号
  phone: string | undefined ='';

  // 昵称
  nickname: string | undefined ='';

  // qq登录后，系统获取腾讯的open_id
  qqOpenId: string | undefined ='';

  // 备注
  remark: string | undefined ='';

  // 有效时间
  validTime: Date|null = null;

  // 是否被删除
  isDelete: boolean | undefined =false;

  // 账号是否是你的 空字符串、MY_SELF、NOT_MY_SELF
  accountRadio: string | undefined ='';

  // 验证码
  code: string | undefined ='';

  // 头像
  headPortrait: any = require('@/assets/imgs/logo2.png');

  constructor(phone?: string, username?: string, password?: string, email?: string) {
    this.phone = phone;
    this.username = username;
    this.password = password;
    this.email = email;
  }
}
