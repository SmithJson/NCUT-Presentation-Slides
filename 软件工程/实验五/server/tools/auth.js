/*
 * @Author: zhangl
 * @Date: 2020-05-23 14:29:56
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-26 23:05:29
 * @FilePath: /server/tools/auth.js
 * @Description: 授权认证
 */
const jwt = require("jwt-simple");
const SECRET_KEY = "NCUT";
const TOKEN_EXPIRES_TIME = 7 * 24 * 60 * 60 * 1000;

module.exports = {
    /**
     * 认证处理
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */

    validate(req, res, next) {
        console.log(req.path);
        const { token } = req.cookies;
        if (!token) {
            res.status(401).send("未授权");
            return;
        }
        const userToken = jwt.decode(token, SECRET_KEY);
        const methods = {
            GET: 'view',
            DELETE: 'del',
            POST: 'edit|add',
        };
        const reg = new RegExp(methods[req.method], 'g');
        const accessRoute = userToken.permission.find(item =>  {
            if (item.permission === req.route.path && reg.test(item.remark)) return item;
        });
        console.log(accessRoute);
        if (!accessRoute) {
            res.status(401).send("非法访问");
            return;
        }
        if (userToken.expires > Date.now()) {
            res.json({ code: -2, msg: 'error', result: '授权超时' });
            return;
        }
        next();
    },

    /**
     * 创建 token
     * @param {Object} user
     */

    createToken(user) {
        let payload = {
            id: user.id,
            time: Date.now(),
            permission: user.permission,
            role: user.role,
            roleId: user.roleId,
            expires: Date.now + TOKEN_EXPIRES_TIME,
            schoolId: user.schoolId,
        };
        return jwt.encode(payload, SECRET_KEY);
    },
    decodeToken(req) {
        const { token } = req.cookies;
        if (!token) {
            res.status(401).send("未授权");
            return;
        }
        return jwt.decode(token, SECRET_KEY);
    }
};