/*
 * @Author: zhangl
 * @Date: 2020-05-26 14:13:51
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-26 15:33:16
 * @FilePath: /server/routes/profile.js
 * @Description: 个人信息模块
 */
const { SuccessModal, ErrorModal } = require("../models");
const { execute } = require("../lib/mysql");
const { decodeToken } = require("../tools/auth");

function Detail(req, res, next) {
    const { id } = req.query;
    console.log(id, 111111);
    const SELECT_USERS = `SELECT * FROM users WHERE is_delete = 0 AND users.users_id = '${id}'`;
    const SELECT_SCHOOL_DEPT = ` SELECT * FROM users_school_dept WHERE users_id = '${id}'`;
    execute(SELECT_USERS).then(values => {
        if (!values.length) return res.json(new ErrorModal("非法用户"));
        const token = decodeToken(req);
        if (!token) return res.json(new ErrorModal("授权超时"));
        execute(SELECT_SCHOOL_DEPT).then(v => {
            if (!v.length) return res.json(new ErrorModal("非法用户"));
            const newValue = values.map((item) => ({
                no: item.users_id,
                username: item.users_name,
                gender: item.users_gender,
                email: item.users_email,
                age: item.users_age,
                create_time: item.create_time,
                avatar: item.users_avatar,
                tel: item.users_tel,
                role: token.role || "非法用户"
            }));
            const newV = v.map(item => ({
                schoolId: item.school_id,
                deptId: item.dept_id,
            }));
            const result = {
                ...newValue[0],
                ...newV[0],
            };
            res.json(new SuccessModal(result));
        });
    }).catch(err => {
        console.log(err);
        res.json("网络异常");
    })
}

module.exports = {
    Detail,
};