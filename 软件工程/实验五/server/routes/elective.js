/*
 * @Author: zhangl
 * @Date: 2020-05-25 23:46:27
 * @LastEditors: zhangl
 * @LastEditTime: 2020-06-05 12:07:14
 * @FilePath: /server/routes/elective.js
 * @Description: 选课模块
 */
const { SuccessModal, ErrorModal } = require("../models");
const { execute } = require("../lib/mysql");
const { decodeToken } = require("../tools/auth");

function List(req, res, next) {
    const token = decodeToken(req);
    const { page, search, size = 10 } = req.query;
    let SELECT_ELECTIVE = `
        SELECT id, student_id, course.course_id, course_name, score, bingo, users_name
        FROM users_course_elective,
            users,
            course
        WHERE users_course_elective.student_id = users.users_id
        AND users_course_elective.course_id = course.course_id
        AND users.is_delete = 0
        AND users.is_registered = '1'
        AND users_course_elective.is_delete = 0
    `;
    if (search) {
        SELECT_ELECTIVE += `
            AND course_name LIKE '%${search}%'
        `;
    }
    if (/student/.test(token.roleId)) {
        SELECT_ELECTIVE += `
            AND student_id = '${token.id}'
        `
    } else if (/teacher/.test(token.roleId)) {
        SELECT_ELECTIVE += `
            AND course.course_id IN (
                SELECT course_id
                FROM users_course_teach
                WHERE teacher_id = '${token.id}'
            )
        `;
    } else if (/school_admin/.test(token.roleId)) {
        SELECT_ELECTIVE += `
            AND users.users_id IN (
                SELECT users_id
                FROM users_school_dept
                WHERE school_id = '${token.schoolId}'
            )
        `;
    }
    execute(SELECT_ELECTIVE).then(values => {
        if (!page) return res.json("请求失败");
        const newValues = values
            .slice((page - 1) * size, (page - 1) * size + Number(size))
            .map(item => ({
                ...item,
                username: item.users_name,
                name: item.course_name,
            }));
        res.json(new SuccessModal({
            total: values.length,
            list: newValues,
        }));
    }).catch(err => {
        console.log(err);
        res.json(new ErrorModal("网络异常"))
    });
}

function Del(req, res, next) {
    const { id } = req.params;
    if (!id) return res.json(new ErrorModal("删除错误"));
    const DELETE_ELECTIVE = `
        UPDATE users_course_elective
        SET is_delete = 1
        WHERE id = ${id};
    `;
    const SELECT_ELECTIVE = ` SELECT * FROM users_course_elective WHERE id = ${id}`;
    execute(SELECT_ELECTIVE).then(values => {
        if (!values.length) return res.json(new ErrorModal("选课不存在"));
        execute(DELETE_ELECTIVE).then(v => {
            if (v.affectedRows) return res.json(new SuccessModal("删除成功"));
            return res.json(new ErrorModal("删除失败"));
        });
    }).catch(err => {
        console.log(err);
        res.json(new ErrorModal("网络异常"));
    });
}

function Detail(req, res, next) {
    const { id } = req.params;
    if (!id) return res.json(new ErrorModal("请求失败"));
    const SELECT_TEACH = `
        SELECT student_id, course_name, course.course_id, score, bingo, users_name
        FROM users_course_elective,
            users,
            course
        WHERE users_course_elective.student_id = users.users_id
        AND users_course_elective.course_id = course.course_id
        AND users.is_delete = 0
        AND id = ${id};
    `;
    execute(SELECT_TEACH).then(values => {
        const newValues = values
            .map(item => ({
                ...item,
                username: [{ id: item.student_id, value: item.users_name }],
                name: [{ id: item.course_id, value: item.course_name }],
            }));
        if (values.length) return res.json(new SuccessModal(newValues[0]));
        return res.json("选课不存在");
    }).catch(err => {
        console.log(err);
        res.json(new ErrorModal("网络异常"));
    });
}

function Add(req, res, next) {
    const { courseId, studentId, score, bingo } = req.query;
    if (!courseId || !studentId) return res.json(new ErrorModal("添加失败"));
    const INSERT_ELECTIVE = `
         INSERT INTO users_course_elective(student_id, course_id, score, bingo)
        VALUES('${studentId}', '${courseId}', ${score}, ${bingo})
    `;
    execute(INSERT_ELECTIVE).then(values => {
        if (values.affectedRows) return res.json(new SuccessModal("添加成功"));
        return res.json(new ErrorModal("添加失败"));
    }).catch(err => {
        console.log(err);
        res.json(new ErrorModal("网路异常"));
    });
}

function Update(req, res, next) {
    const { id } = req.params;
    const { courseId, studentId, score, bingo } = req.query;
    if (!id || !courseId || !studentId) return res.json(new ErrorModal("添加失败"));
    const UPDATE_ELECTIVE = `
        UPDATE users_course_elective
        SET student_id = '${studentId}',
            course_id = '${courseId}',
            score = ${score},
            bingo = '${bingo}'
        WHERE id = ${id}
    `;
    const SELECT_ELECTIVE = `SELECT * FROM users_course_elective WHERE id = ${id}`;
    execute(SELECT_ELECTIVE).then(values => {
        if (!values.length) return res.json(new ErrorModal("选课不存在"));
        execute(UPDATE_ELECTIVE).then(values => {
            if (values.affectedRows) return res.json(new SuccessModal("更新成功"));
            return res.json(new ErrorModal("更新失败"));
        }).catch(err => {
            console.log(err);
            res.json(new ErrorModal("网路异常"));
        });
    }).catch(err => {
        console.log(err);
    })
}

module.exports = {
    List,
    Del,
    Detail,
    Add,
    Update,
};
