/*
 * @Author: zhangl
 * @Date: 2019-08-20 16:10:16
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-04 20:34:13
 * @Description: devServer配置
 */
const openbrowser = require('openbrowser');
const paths = require('./paths');

module.exports = (config = {}) => {
    const wds = {
        contentBase: config.contentBase || paths.appBuild,
        compress: true,
        port: config.port || 12306,
        publicPath: '/',
        open: config.open || false,
        hot: config.hot || true,
        host: config.host || '127.0.0.1',
        overlay: true, // 将编译错误显示在页面
        stats: { // 显示信息配置
            assets: false,
            builtAt: false,
            cached: false,
            children: false,
            chunks: false,
            chunkModules: false,
            chunkOrigins: false,
            entrypoints: false,
            hash: false,
            modules: false,
            source: false,
            version: false,
        },
        // proxy: { // 服务器代理
        //     index: '',
        //     '/': {
        //         changeOrigin: true, // 解除origin校验
        //         target: config.proxy.mock || config.proxy.dev,
        //         secure: false, // 支持https
        //     },
        // },
    };

    setTimeout(() => {
        openbrowser(`${wds.http2 ? 'https' : 'http'}://${wds.host}:${wds.port}`);
    }, 0);
    return wds;
};
