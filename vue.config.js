const path = require("path");
const webpack = require('webpack')
module.exports = {
    // publicPath
    publicPath:'/',
    indexPath:'/login.html',
    productionSourceMap:true,
    // 关闭ESlint
    lintOnSave: false,
    pages: {//配置多页面入口        
        login: {          
            // page 的入口
            entry: 'src/pages/login/main.ts',          
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
        // regist: {          
        //   entry: 'src/pages/regist/main.ts',          
        //   template: 'src/pages/regist/regist.html',
        //   filename: 'regist.html',
        //   title:'注册页'        
        // },     
        index: {        
          // page 的入口文件  
          entry: 'src/pages/index/main.ts',          
          // 模板文件
          template: 'src/pages/index/index.html',        
        }, 
    },
    // webpack 配置
    configureWebpack: {
         plugins: [
            new webpack.ProvidePlugin({
              $:"jquery",
              jQuery:"jquery",
              "windows.jQuery":"jquery"
            })
          ]
      },
    
}