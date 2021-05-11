const path = require("path");
const webpack = require('webpack')
const BaseUrl = require('./src/config/BaseUrl.ts')
const Pages = require("./src/config/Pages.ts")

module.exports = {
    // publicPath
    publicPath:'/',
    /* 输出文件目录：在npm run build时，生成文件的目录名称 */
    outputDir: 'dist',
    /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
    productionSourceMap:true,
    /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
    filenameHashing: false,
    indexPath:'/login.html',
    // 代码保存时进行eslint检测
    lintOnSave: false,
    //配置多页面入口
    pages:Pages.createPages(),
    /* webpack-dev-server 相关配置 */
    devServer: {
        /* 自动打开浏览器 */
        open: false,
        /* 设置为0.0.0.0则所有的地址均能访问 */
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        /* 使用代理 需要安装(npm i http-proxy-middleware)*/
        proxy: {
          '/api/oauth2': {
            target: BaseUrl.oauth2Url,
            // 解决跨域问题
            changeOrigin: true,
            pathRewrite: {
              "": ""
            }
          },
          '/api/message': {
            target: BaseUrl.messageUrl,
            changeOrigin: true,
            pathRewrite: {
              "": ""
            }
          },
        }
    },
    // webpack 配置
    configureWebpack: {
         plugins: [
            new webpack.ProvidePlugin({
              $:"jquery",
              jQuery:"jquery",
              "windows.jQuery":"jquery"
            })
         ],
        resolve: {
            extensions: ['.js', '.ts', '.vue', '.json']
        }
      },


}
