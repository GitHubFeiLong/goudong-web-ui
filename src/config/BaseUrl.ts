/*
  这里是一个默认的url，可以没有
  测试环境和生产环境需要在Nginx中进行配置
 */
let gatewayUrl = '';
// 根据环境设置 服务不同的地址
switch (process.env.VUE_APP_ENV) {
  case 'test': // 测试环境
    gatewayUrl = 'http://192.168.74.128:10000/';
    break;
  case 'prod': // 生产环境url
    gatewayUrl = 'http://goudong.shop:10000/';
    break;
  default: // 开发环境url
    gatewayUrl = 'http://localhost:10000/';
    break;
}

// commonjs 导出是module.exports，导入是require
module.exports = {
  gatewayUrl,
};
