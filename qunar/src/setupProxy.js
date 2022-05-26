const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(createProxyMiddleware('/homepage', {
        target: 'https://touch.dujia.qunar.com',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
            '^/homepage': '/'
        }
    }))

    app.use(createProxyMiddleware('/goods_api', {
        target: 'https://ugc.dujia.qunar.com',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
            '^/goods_api': '/'
        }
    }))
}
