'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
    dev: {

        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            // '/': {
            //     // target: 'http://120.26.90.235/',

            //     target: 'http://180.76.170.247:8081',
            //     // target: 'http://10.5.70.121:8080/', // 设置你调用的接口域名和端口号
            //     changeOrigin: true, // 跨域
            //     pathRewrite: {
            //         '^/api': '/'
            //     }
            // },
            '/apies': { //匹配所有以'/api2'开头的请求路径
                target: 'https://sandcastle.cesium.com', //代理目标的基础路径
                changeOrigin: true,
                pathRewrite: { '^/apies': '' }
            },
            '/apip': {
                target: 'http://t0.tianditu.gov.cn', //代理目标的基础路径
                changeOrigin: true,
                pathRewrite: { '^/apip': '' }
            }
        },

        // Various Dev Server settings
        host: 'localhost',
        // host: '192.168.0.163',
        // host: '192.168.0.111', // can be overwritten by process.env.HOST
        port: 80, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',
        // devtool: 'source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',

        /**
         * Source Maps
         */

        productionSourceMap: true,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}