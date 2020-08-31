/*
 * @Author: zhangl
 * @Date: 2020-05-26 21:09:22
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-26 21:20:25
 * @FilePath: /server/routes/statistic.js
 * @Description: 统计模块
 */
const { SuccessModal, ErrorModal } = require("../models");
const { execute } = require("../lib/mysql");

function Detail(req, res, next) {
    console.log(1111);
    const SELECT_STATISTIC = `
        SELECT COUNT(users_course_elective.course_id), users_course_elective.course_id, course.course_name
        FROM users_course_elective,
            course
        WHERE users_course_elective.course_id = course.course_id
        GROUP BY users_course_elective.course_id
    `;
    execute(SELECT_STATISTIC).then(values => {
        const newValue = values.map(item => ({
            count: item["COUNT(users_course_elective.course_id)"],
            name: item.course_name,
        }))
        res.json(new SuccessModal(newValue));
    }).catch(err => {
        console.log(err);
        res.json(new ErrorModal("网络错误"));
    })
}

module.exports = {
    Detail,
};
