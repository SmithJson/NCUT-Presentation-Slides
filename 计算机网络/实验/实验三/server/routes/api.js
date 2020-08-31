/*
 * @Author: zhangl
 * @Date: 2020-05-31 21:52:42
 * @LastEditors: zhangl
 * @LastEditTime: 2020-06-01 20:14:28
 * @FilePath: /ex3/routes/api.js
 * @Description: Do not edit
 */
const express = require("express");
const getIp = require("../tools/getIp");
const Route = express.Router();

Route.post("/connect", function (req, res, next) {
    if (!(global.mySocketConfig || {}).ip) {
        res.json({
            code: -1,
            msg: "未启动通信服务",
            result: "未启动通信服务",
        });
        return;
    }
    res.json({
        code: 0,
        msg: "OK",
        result: global.mySocketConfig,
    })
});

Route.get("/ip", function (req, res, next) {
    console.log(111111);
    res.json({
        code: 0,
        msg: "OK",
        result: getIp(),
    })
});

Route.get("/start", function (req, res, next) {
    console.log(req);
    global.mySocketConfig = {
        ip: req.query.ip,
        port: Number(req.query.port),
    }
    console.log(mySocketConfig);
    require("../modules/handleSocket")
    res.json({
        code: 0,
        msg: "OK",
        result: "启动成功",
    })
});

module.exports = Route;
