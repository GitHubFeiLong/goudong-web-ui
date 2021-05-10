export class AuthorityUser {
  // 用户表主键uuid
  public uuid:string="";
  // 用户名
  public username:string="";
  // 密码
  public password:string="";
  // 邮箱
  public email:string="";
  // 手机号
  public phone:string="";
  // 昵称
  public nickname:string="";
  // qq登录后，系统获取腾讯的open_id
  public qqOpenId:string="";
  // 备注
  public remark:string="";
  // 有效时间
  public validTime:Date=new Date();
  // 是否被删除
  public isDelete:boolean=false;


  constructor(phone:string, username:string, password:string, email:string) {
    this.phone = phone;
    this.username = username;
    this.password = password;
    this.email = email;
  }
}
