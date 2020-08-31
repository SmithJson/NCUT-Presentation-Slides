/*
 * @Author: zhangl
 * @Date: 2020-05-31 13:52:55
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-31 13:53:44
 * @FilePath: /socket_demo/tools/getIp.js
 * @Description: Do not edit
 */
const os = require('os');

function getIPAdress() {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

module.exports = getIPAdress;