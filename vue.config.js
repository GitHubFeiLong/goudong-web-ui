const path = require("path");
const webpack = require('webpack')
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
    pages: {
        login: {
            // page 的入口
            entry: 'src/pages/login/loginMain.ts',
            // 模板来源
            template: 'src/pages/login/login.html',
            // 在 dist/index.html 的输出
            filename: 'login.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Login Page',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            // chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        regist: {
          entry: 'src/pages/regist/registMain.ts',
          template: 'src/pages/regist/regist.html',
          filename: 'regist.html',
          title:'Regist Page',
        },
        forgotPwd: {
          entry: 'src/pages/forgotPwd/forgotPwdMain.ts',
          template: 'src/pages/forgotPwd/forgotPwd.html',
          filename: 'forgotPwd.html',
          title:'forgot password',
        },
        bindPage: {
          entry: 'src/pages/bindPage/bindPageMain.ts',
          template: 'src/pages/bindPage/bindPage.html',
          filename: 'bindPage.html',
          title:'账号绑定',
        },
        index: {
            // page 的入口文件
            entry: 'src/pages/index/main.ts',
            // 模板文件
            template: 'src/pages/index/index.html',
          },
    },
    /* webpack-dev-server 相关配置 */
    devServer: {
        /* 自动打开浏览器 */
        open: false,
        /* 设置为0.0.0.0则所有的地址均能访问 */
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        /* 使用代理 */
        proxy: {
            '/api': {
                target: 'http://localhost:10003/api',
                secure: false,  // 如果是https接口，需要配置这个参数
                ws: true,//是否代理websockets
                // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                changeOrigin: true,
                pathRewrite: {
                  '^/api': ''
                }
            }
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
