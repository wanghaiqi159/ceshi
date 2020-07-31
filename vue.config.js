const webpack = require('webpack')
module.exports={
    //配置跨域
    devServer:{
        hot: true, //热加载
        proxy:{
            '/api':{
                target:"http://localhost:3000",
                ws:true,
                changeOrigin:true,
                pathRewrite:{
                    '^/api':''
                }
            },
        }
    }

}