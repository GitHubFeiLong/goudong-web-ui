//这里是一个默认的url，可以没有
let messageUrl = "", oauth2Url="";

// 根据环境设置 服务不同的地址
switch (process.env.NODE_ENV) {
  case 'development': //开发环境url
    messageUrl = "http://localhost:10003/";
    oauth2Url = "http://localhost:10001/";
    break
  case 'production': //生产环境url
    break
}

module.exports = {
  messageUrl,
  oauth2Url
}
