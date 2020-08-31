/*
 * @Author: zhangl
 * @Date: 2019-08-22 16:52:59
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-08 00:19:46
 * @Description: Dll配置文件
 */
const webpack = require('webpack');
const paths = require('./paths');

module.exports = {
    entry: {
        react: [
            'react', 'react-dom',
        ],
    },
    output: {
        filename: '[name].[contenthash:5].dll.js',
        path: paths.dllBuild,
        library: '[name]', // 模块支持script标签引入，并将模块作为全局变量
    },
    mode: 'production',
    plugins: [
        // 创建映射文件，当使用了dll模块内容，webpack不会再从node_modules去查找
        new webpack.DllPlugin({
            name: '[name]',
            path: `${paths.dllBuild}/[name].manifest.json`,
        }),
    ],
};
