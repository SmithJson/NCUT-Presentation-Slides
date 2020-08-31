/*
 * @Author: zhangl
 * @Date: 2020-05-13 11:51:50
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-23 03:02:25
 * @FilePath: /server/lib/mysql.js
 * @Description: Do not edit
 */
const mysql = require("mysql");
const { MYSQL } = require("../config");

const { escape } = mysql;
const db = mysql.createConnection(MYSQL);

db.connect((err) => {
    if (err) throw(err);
    console.log("MySql Connected...");
});

function execute(...arg) {
    return new Promise((resolve, reject) => {
        db.query(...arg, (err, res) => {
            if (err) reject(err);
            else resolve(res);
        })
    });
}

module.exports = {
    execute,
    escape,
};