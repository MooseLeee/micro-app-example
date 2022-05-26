require('./src/configs')
const packageName = require('./package.json').name

module.exports = {
    configureWebpack: {
        output: {
            // 微应用的包名，这里与主应用中注册的微应用名称一致
            library: `${packageName}`,
            // 将你的 library 暴露为所有的模块定义下都可运行的方式
            libraryTarget: 'umd',
            // 按需加载相关，设置为 webpackJsonp_VueMicroApp 即可
            jsonpFunction: `webpackJsonp_${packageName}`,
        }
    },
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*',
        },
        proxy: {
            '/data-center-manage': { //定义的代理名
                target: 'http://192.168.1.33:8808/', //接口地址
                changeOrigin: true,
                pathRewrite: {
                    '^/data-center-manage': '/'
                }
            },
        },
    },
}
