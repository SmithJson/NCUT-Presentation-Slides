/*
 * @Author: zhangl
 * @Date: 2019-08-19 01:11:03
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-10 00:16:15
 * @Description: 文件路径
 */
const path = require('path');

// 获取app路径
const resolveApp = appPath => path.join(__dirname, '../', appPath);

module.exports = {
    appSrc: resolveApp('src'),
    appIndexJs: resolveApp('src/index'),
    appBuild: resolveApp('build'),
    dllBuild: resolveApp('dll'),
    publicHtml: resolveApp('public/index.html'),
    publicIcon: resolveApp('public/favicon.ico'),
    appProjectJson: resolveApp('src/config/project.json'),
    packageJson: resolveApp('package.json'),
};
