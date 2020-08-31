/*
 * @Author: zhangl
 * @Date: 2020-05-31 15:12:16
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-31 15:46:49
 * @FilePath: /socket_demo/tools/checkPort.js
 * @Description: Do not edit
 */
var net = require('net')

// 检测端口是否被占用
function portIsOccupied(port) {
    return new Promise((resolve, reject) => {
        // 创建服务并监听该端口
        var server = net.createServer().listen(port)

        server.on('listening', function () { // 执行这块代码说明端口未被占用
            server.close() // 关闭服务
            resolve();
        })

        server.on('error', function (err) {
            if (err.code === 'EADDRINUSE') { // 端口已经被使用
                reject();
            }
        })
    });
}

module.exports = portIsOccupied;
