const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(createProxyMiddleware('/homepage', {
        target: 'http://localhost:8081',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
            '^/homepage': '/homepage'
        }
    }))

    app.use(createProxyMiddleware('/goods_api', {
        target: 'http://localhost:8081',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
            '^/goods_api': '/goods_api'
        }
    }))
}
