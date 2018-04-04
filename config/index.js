// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        sitEnv: require('./sit.env'),
        prodEnv: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: '',
        assetsPublicPath: './',
        staticPath:'./',
        port:9527,
        productionSourceMap: false,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 9550,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        staticPath:'/static/',
        proxyTable: {
            '/api': {
                // target:'http://218.94.124.47:7080/api/',
                // target:'http://192.168.5.188:443/api/',
                // target:'http://192.168.5.188:7078/api/',
                // target:'http://192.168.5.183/api/',
                // target:'http://192.168.5.189:80/api/',
                // target:'http://192.168.5.189/api/',
                target:'http://192.168.32.181:80/api/',
                // target:'http://192.168.5.189:80/api/',

                // target:'http://192.168.5.188/api/',
                // target:'http://192.168.5.154:8888/api/',
                changeOrigin: true,
                // secure: false,
                pathRewrite: {                //需要rewrite重写的, 如果在服务器端做了处理则可以不要这段
                    '^/api': ''
                }
            }
        },
        cssSourceMap: false
    }
}
