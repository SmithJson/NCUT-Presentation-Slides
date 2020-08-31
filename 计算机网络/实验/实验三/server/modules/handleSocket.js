/*
 * @Author: zhangl
 * @Date: 2020-05-31 23:38:54
 * @LastEditors: zhangl
 * @LastEditTime: 2020-06-01 20:37:11
 * @FilePath: /ex3/modules/handleSocket.js
 * @Description: Do not edit
 */
const app = global.myApp;
const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(global.mySocketConfig.port, global.mySocketConfig.ip);

// socket 用户列表
const socketMap = new Map();
let memberCount = 0;
let userList = [];
const allChat = [];

io.on("connection", function (socket) {
    console.log(`${socket.id} 进入`);

    // 加入群聊
    socket.on("join", (username, avatar) => {
        memberCount++;
        socket.username = username;
        socketMap.set(username, socket.id);
        const user = {
            username,
            avatar,
            id: socket.id,
            tip: false,
        };
        userList.push(user);
        // 全员广播
        socket.broadcast.emit("welcome", username, memberCount, userList);
        socket.emit("myself", username, memberCount, userList, socket.id)
    });

    // 接收群发信息
    socket.on("message", data => {
        allChat.push(data);
        // 系统
        io.emit("all", allChat);
        socket.broadcast.emit("gdMsg", data);
    });

    // 单聊
    socket.on("o2oMsg", data => {
        allChat.push(data);
        // 系统
        io.emit("all", allChat);
        socket.to(data.tid).emit("o2oGdMsg", data);
    });



    socket.on("disconnecting", () => {
        if (socketMap.has(socket.username)) {
            console.log(`${socket.id} 离开`);
            const username = socket.username;
            memberCount--
            userList = userList.filter(item => socket.username !== item.username)
            socketMap.delete(username);
            delete socket.username;
            socket.broadcast.emit("quit", username, memberCount, userList);
        }
    });
});