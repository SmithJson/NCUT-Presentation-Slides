/*
 * @Author: zhangl
 * @Date: 2020-05-13 11:04:50
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-23 02:06:30
 * @FilePath: /server/middlewares/urlparams.js
 * @Description: 获取 url 参数
 */
const url = require("url");
const qs = require("querystring");

function urlparams(req, res, next) {
    let query = {};
    if (/get|head/ig.test(req.method)) {
        const urlJson = url.parse(req.url);
        query = qs.parse(urlJson.query);
    } else {
        query = req.body;
    }
    req.query = query;
    next();
}

module.exports = urlparams;