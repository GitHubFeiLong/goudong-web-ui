// 这里是一个默认的url，可以没有
let gatewayUrl = '';

// 根据环境设置 服务不同的地址
switch (process.env.NODE_ENV) {
  case 'development': // 开发环境url
    gatewayUrl = 'http://localhost:10000/';
    break;
  case 'production': // 生产环境url
    gatewayUrl = 'http://goudong.shop:10000/';
    break;
}

module.exports = {
  gatewayUrl,
};
