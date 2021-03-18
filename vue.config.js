const path = require("path");
const webpack = require('webpack')
module.exports = {
    // 关闭ESlint
    lintOnSave: false,
    pages: {//配置多页面入口        
        login: {          
          entry: 'src/pages/login/main.ts',          
          template: 'src/pages/login/login.html',        
        },        
        index: {        
          // page 的入口文件  
          entry: 'src/pages/index/main.ts',          
          // 模板文件
          template: 'src/pages/index/index.html',        
        },    
    },
    configureWebpack: {
         plugins: [
            new webpack.ProvidePlugin({
              $:"jquery",
              jQuery:"jquery",
              "windows.jQuery":"jquery"
            })
          ]
      },
    // pluginOptions: {
    //     "style-resources-loader": {
    //         preProcessor: "less",
    //         patterns: [
    //             path.resolve(__dirname, "./src/assets/index.less")
    //         ]
    //      }
    //  }
}