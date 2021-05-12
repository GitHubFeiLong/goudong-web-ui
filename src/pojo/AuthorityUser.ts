export class AuthorityUser {
  // 用户表主键uuid
  uuid:string="";
  // 用户名
  username:string="";
  // 密码
  password:string="";
  // 邮箱
  email:string="";
  // 手机号
  phone:string="";
  // 昵称
  nickname:string="";
  // qq登录后，系统获取腾讯的open_id
  qqOpenId:string="";
  // 备注
  remark:string="";
  // 有效时间
  validTime:Date|null = null;
  // 是否被删除
  isDelete:boolean=false;
  // 账号是否是你的 空字符串、MY_SELF、NOT_MY_SELF
  accountRadio:string="";

  constructor(phone:string, username:string, password:string, email:string) {
    this.phone = phone;
    this.username = username;
    this.password = password;
    this.email = email;
  }
}
