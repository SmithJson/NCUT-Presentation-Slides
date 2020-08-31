/*
 * @Author: zhangl
 * @Date: 2020-05-24 00:32:47
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-24 11:55:45
 * @FilePath: /server/routes/school.js
 * @Description: 学院和系模版
 */
const { SuccessModal, ErrorModal } = require("../models");
const { execute } = require("../lib/mysql");

function school(req, res, next) {
    const SELECT_SCHOOL = `SELECT * FROM school WHERE is_delete = 0`;
    execute(SELECT_SCHOOL).then(values => {
        const newValues = values.map(row => ({
            id: row.school_id,
            value: row.school_name,
        }));
        res.json(new SuccessModal(newValues));
    }).catch(err => {
        console.log(err);
        res.json(new ErrorModal("网络错误"));
    });
}

function dept(req, res, next) {
    const { id } = req.params;
    if (!id) return res.json(new ErrorModal("请求失败"));
    const SELECT_SCHOOL = `
        SELECT *
        FROM dept
        WHERE dept_id in (
            SELECT DISTINCT dept_id
            FROM users_school_dept
            WHERE school_id = '${id}'
        );
    `;
    execute(SELECT_SCHOOL).then(values => {
        const newValue = values.map(row => ({
            id: row.dept_id,
            value: row.dept_name,
        }))
        res.json(new SuccessModal(newValue));
    });
}

module.exports = {
    school,
    dept,
};