/*
 * @Author: zhangl
 * @Date: 2020-05-25 15:34:59
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-25 15:49:16
 * @FilePath: /server/routes/times.js
 * @Description: 时间段模块
 */
const { SuccessModal, ErrorModal } = require("../models");
const { execute } = require("../lib/mysql");

function times(req, res, next) {
    const SELECT_TIMES = `
        SELECT * FROM times
    `;
    execute(SELECT_TIMES).then(values => {
        const newValues = values.map(row => ({
            id: row.times_id,
            value: row.times_value,
            remark: row.remark,
        }))
        res.json(new SuccessModal(newValues));
    }).catch(err => {
        console.log(err);
        res.json(new ErrorModal("网络异常"));
    })
}

module.exports = times;
