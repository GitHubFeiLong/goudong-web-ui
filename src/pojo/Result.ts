export default class Result {
  // 状态码（0 失败， 1 成功， 其他 错误）
  public code:string="";
  // 接口返回的数据
  public data:object|null=null;
  // 后续新增返回的数据
  public dataMap:Map<string, string>|null=null;
  // 客户端错误提示
  public clientMessage:string="客户端提示信息";
  // 服务端错误提示
  public serverMessage:string="服务端错误信息";
  // 返回时间
  public timestamp:Date= new Date();
}
