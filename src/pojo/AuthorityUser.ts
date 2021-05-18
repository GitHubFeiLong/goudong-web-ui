export class AuthorityUser {
  // 用户表主键uuid
  uuid='';

  // 用户名
  username='';

  // 密码
  password='';

  // 邮箱
  email='';

  // 手机号
  phone='';

  // 昵称
  nickname='';

  // qq登录后，系统获取腾讯的open_id
  qqOpenId='';

  // 备注
  remark='';

  // 有效时间
  validTime: Date|null = null;

  // 是否被删除
  isDelete=false;

  // 账号是否是你的 空字符串、MY_SELF、NOT_MY_SELF
  accountRadio='';

  // 验证码
  code='';

  constructor(phone: string, username: string, password: string, email: string) {
    this.phone = phone;
    this.username = username;
    this.password = password;
    this.email = email;
  }
}
