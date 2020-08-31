/*
 * @Author: zhangl
 * @Date: 2020-05-31 16:19:59
 * @LastEditors: zhangl
 * @LastEditTime: 2020-06-01 20:07:48
 * @FilePath: /ex3/app.js
 * @Description: Do not edit
 */
const path = require('path');
const createError = require('http-errors');
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const urlparams = require("./middlewares/urlparams");

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(urlparams);

global.mySocketConfig = {
    ip: '192.168.1.13',
    port: 8082,
};

global.myApp = app;

app.use("/api", require("./routes/api"));

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(port, () => console.log("服务开启成功"));