/*
 * @Author: zhangl
 * @Date: 2019-08-19 01:08:02
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-18 00:49:57
 * @Description: webpack配置项
 */
const fs = require('fs');
const AddOssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isWsl = require('is-wsl');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const { default: WebpackDeepScopeAnalysisPlugin } = require('webpack-deep-scope-plugin');
const webpack = require('webpack');
const paths = require('./paths');
const createDevServerFactory = require('./webpack.devServer');

const project = require(paths.appProjectJson);
const packageJson = require(paths.packageJson);

// 文件类型正则
const cssRegex = /\.css$/;
const lessRegex = /\.less$/;
const jsRegex = /\.(jsx?|tsx?|mjs)$/;
const picRegex = /\.(bmp|gif|jpe?g|png)$/;
const manifestJsonRegex = /\.*\.manifest.json$/;
const dllRegex = /\.*\.dll.js$/;

// 构建环境（mock或dev === 'development'）
const { env: { scene } } = process;
const isEnvProduction = scene === 'prod';

// 根据构建环境创建插件
const createPluginsFactory = () => {
    const plugins = [
        new HtmlWebpackPlugin({
            template: paths.publicHtml,
            favicon: paths.publicIcon,
            title: project.name,
            hash: isEnvProduction, // 给html中所有的js, css添加hash值
            minify: {
                collapseWhitespace: isEnvProduction, // 删除空格
                removeComments: isEnvProduction, // 删除注释
                removeRedundantAttributes: isEnvProduction, // 删除冗余属性
                removeScriptTypeAttributes: isEnvProduction, // 删除script的type属性
                removeStyleLinkTypeAttributes: isEnvProduction, // 删除link的type属性
                useShortDoctype: isEnvProduction, // 使用H5的文档类型定义
                keepClosingSlash: isEnvProduction, // 使用/>作为单标签结束符
                minifyURLs: isEnvProduction, // 压缩url
            },
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                paths.appBuild,
            ],
        }),
        new webpack.DefinePlugin({ // 设置全局变量
            NODE_ENV: JSON.stringify(process.env.scene),
            PROXY: JSON.stringify(packageJson.proxy),
        }),
        new MiniCssExtractPlugin({
            filename: `static/css/${isEnvProduction
                ? '[name].[contenthash:8].css'
                : '[name].css'}`,
            chunkFilename: `static/css/${isEnvProduction
                ? '[name].[contenthash:8].chunk.css'
                : '[name].chunk.css'}`,
        }),
    ];

    // 将dll.js添加到html文件中
    fs.readdirSync(paths.dllBuild).forEach(file => {
        const filePath = `${paths.dllBuild}/${file}`;

        if (manifestJsonRegex.test(file)) {
            plugins.push(
                new webpack.DllReferencePlugin({
                    manifest: filePath,
                }),
            );
        }

        if (dllRegex.test(file)) {
            plugins.push(
                new AddOssetHtmlWebpackPlugin({
                    filepath: filePath,
                    outputPath: './static/js',
                    publicPath: './static/js',
                }),
            );
        }
    });

    if (isEnvProduction) { // 生产环境
        plugins.push(
            new WebpackDeepScopeAnalysisPlugin(),
            new WorkboxPlugin.GenerateSW({
                clientsClaim: true,
                skipWaiting: true,
            }),
        );
    } else { // 开发环境
        plugins.push(
            new webpack.HotModuleReplacementPlugin(),
        );
    }

    return plugins;
};

// 根据构建环境创建样式处理
const getStyleLoader = (cssOptions, preProcess, preProcessOptions) => {
    const loader = [
        isEnvProduction
            ? {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '../../', // 处理打包样式文件路径
                },
            }
            : 'style-loader',
        {
            loader: 'css-loader',
            options: cssOptions,
        },
        'postcss-loader',
    ];

    if (preProcess) {
        loader.push({
            loader: preProcess,
            options: preProcessOptions,
        });
    }

    return loader;
};

module.exports = {
    bail: isEnvProduction, // 编译错误，直接停止打包过程（只在生产环境下使用）
    devServer: createDevServerFactory(),
    devtool: isEnvProduction
        ? 'cheap-module-source-map'
        : 'cheap-module-eval-source-map',
    entry: {
        index: paths.appIndexJs,
    },
    output: {
        filename: `static/js/${isEnvProduction
            ? '[name].[contenthash:8].js'
            : 'bundle.js'}`,
        chunkFilename: `static/js/${isEnvProduction
            ? '[name].[contenthash:8].chunk.js'
            : '[name].chunk.js'}`,
        path: paths.appBuild,
        publicPath: packageJson.homepage || './',
    },
    resolve: {
        alias: { // 设置别名
            src: paths.appSrc,
        },
        extensions: [ // 忽略文件后缀
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
        ],
        modules: [ // 模块查询顺序
            'node_modules',
            paths.appSrc,
        ],
    },
    plugins: createPluginsFactory(),
    mode: isEnvProduction ? 'production' : 'development',
    externals: {
        chartjs: 'Chart',
        lodash: '_',
        jquery: 'jQuery',
    },
    module: {
        rules: [
            scene === 'mock' ? { // eslint处理
                test: jsRegex,
                enforce: 'pre',
                loader: 'eslint-loader',
                include: paths.appSrc,
                options: {
                    formatter: 'eslint-friendly-formatter',
                    eslintPath: 'eslint',
                },
            } : {},
            {
                oneOf: [
                    { // js文件处理
                        test: jsRegex,
                        include: paths.appSrc,
                        use: [
                            'cache-loader',
                            'babel-loader',
                            'thread-loader',
                        ],
                    },
                    { // css文件处理
                        test: cssRegex,
                        use: getStyleLoader({
                            importLoaders: 1,
                            sourceMap: false,
                        }),
                        sideEffects: true,
                    },
                    { // less文件处理
                        test: lessRegex,
                        use: getStyleLoader(
                            {
                                importLoaders: 2,
                                modules: false,
                                sourceMap: false,
                            },
                            'less-loader',
                            {
                                modifyVars: {
                                    'primary-color': '#1DA57A',
                                    // 'link-color': '#1DA57A',
                                    // 'border-radius-base': '2px',
                                },
                                javascriptEnabled: true,
                            },
                        ),
                        sideEffects: true,
                    },
                    { // url-loader：处理图片类型文件
                        test: picRegex,
                        loader: 'url-loader',
                        options: {
                            limit: 4000, // 当文件小于10KB转换为DataURL形式
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    },
                    { // file-loader：处理其他类型的文件
                        loader: 'file-loader',
                        exclude: [
                            jsRegex,
                            /\.html$/,
                            /\.json$/,
                        ],
                        options: {
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    optimization: {
        usedExports: true, // 通知webpack被使用的模块
        splitChunks: {
            chunks: 'all', // 对所有代码进行代码分割
        },
        runtimeChunk: {
            // 抽离业务代码和第三方发模块的关系代码，避免"contenthash"占位符失效
            name: 'runtime',
        },
        minimize: isEnvProduction,
        minimizer: [
            // css压缩
            new OptimizeCssAssetsPlugin(),
            // js压缩
            new TerserWebpackPlugin({
                cache: true,
                exclude: /\.min\.js$/,
                parallel: !isWsl, // 开启多线程 (在WSL系统禁用)
                terserOptions: {
                    compress: {
                        comparisons: false,
                        drop_console: true, // 删除console语句
                        inline: 2,
                    },
                    mangle: {
                        safari10: true,
                    },
                    parse: {
                        ecma: 8,
                    },
                    output: {
                        ascii_only: true, // 允许转义Unicode字符
                    },
                },
            }),
        ],
    },
};
