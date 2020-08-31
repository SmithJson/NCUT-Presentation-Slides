/*
 * @Author: zhangl
 * @Date: 2020-05-24 16:45:50
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-27 01:06:40
 * @FilePath: /server/routes/course.js
 * @Description: 课程模块
 */
const { SuccessModal, ErrorModal } = require("../models");
const { execute } = require("../lib/mysql");
const { decodeToken } = require("../tools/auth");

function List(req, res, next) {
    const token = decodeToken(req);
    let SELECT_COURSE = `
        SELECT *
        FROM course
        WHERE is_delete = 0
    `;
    const { scene, page, size = 10, search, id } = req.query;
    if (search) {
        SELECT_COURSE += `
            AND course_name LIKE '%${search}%'
        `;
        console.log(token);
        if (/teacher/.test(token.roleId)) {
            SELECT_COURSE += `
            AND course.course_id IN (
                SELECT users_course_teach.course_id
                FROM users_course_teach
                WHERE users_course_teach.teacher_id = '${token.id}'
            )
        `;
        }
    }
    if (id) {
        SELECT_COURSE += `
            AND course.course_id = '${id}';
        `;
    }
    if (/school_admin/.test(token.roleId)) {
        SELECT_COURSE += `
            AND school_id = '${token.schoolId}'
        `
    }
    execute(SELECT_COURSE).then(values => {
        let newValues = values
            .map(row => {
                const result = {
                    id: row.course_id,
                    name: row.course_name,
                    cycle: row.course_cycle,
                    credit: row.course_credit,
                    value: row.course_name,
                    schoolId: row.school_id,
                };
                if (row.pre_id) {
                    var temp = row.pre_id.split(",");
                    const pre = values
                        .filter(item => temp.includes(item.course_id))
                        .map(item => ({ id: item.course_id, value: item.course_name }));
                    result.prev = pre;
                }
                return result;
            });
    if (page) newValues = newValues.slice((page - 1) * size, (page - 1) * size + Number(size));
    res.json(new SuccessModal(page ? { list: newValues, total: newValues.length } : newValues));
    }).catch(err => {
        console.log(err);
        res.json(new ErrorModal("网络异常"));
    });
}

function Del(req, res, next) {
    const { id } = req.params;
    if (!id) return res.json(new ErrorModal("课程不存在"));
    const DELETE_COURSE = `
        UPDATE course
        SET is_delete = 1
        WHERE course_id = '${id}'
    `;
    const SELECT_COURSE = `
        SELECT *
        FROM course
        WHERE course_id = '${id}'
    `;
    execute(SELECT_COURSE).then(row => {
        if (!row.length) return res.json(new ErrorModal("课程不存在"));
        execute(DELETE_COURSE).then(v => {
            if (v.affectedRows) return res.json(new SuccessModal("修改成功"));
            res.json(new ErrorModal("修改失败"));
        }).catch(err => {
            console.log(err);
            res.json(new ErrorModal("网络异常"));
        });
    });
}

function Detail(req, res, next) {
    const { id } = req.params;
    if (!id) return res.json(new ErrorModal("课程不存在"));
    const SELECT_COURSE = `
        SELECT *
        FROM course
        WHERE course_id = '${id}'
            AND is_delete = 0 `;
    const SELECT_COURSE_ALL = `
        SELECT *
        FROM course
        WHERE is_delete = 0;
    `;
    Promise.all([
        execute(SELECT_COURSE_ALL),
        execute(SELECT_COURSE),
    ]).then(values => {
        const [courseList, course] = values;
        if (!course.length) return res.json("课程不存在");
        const newValues = course.map(row => {
            const result = {
                id: row.course_id,
                name: row.course_name,
                cycle: row.course_cycle,
                credit: row.course_credit,
                intro: row.course_intro,
                schoolId: row.school_id,
            };
            if (row.pre_id) {
                var temp = row.pre_id.split(",");
                const pre = courseList
                    .filter(item => temp.includes(item.course_id))
                    .map(item => ({ id: item.course_id, value: item.course_name }));
                result.prev = pre;
            }
            return result;
        });
        res.json(new SuccessModal(newValues[0] || {}));
    }).catch(err => {
        console.log(err);
        res.json(new ErrorModal("网络异常"));
    });
}

function Add(req, res, next) {
    const reqBody = req.query;
    const { id, cycle, name, credit, intro, prevId, schoolId } = reqBody;
    if (!id || cycle < 0 || !name || credit < 0 || !schoolId) return res.json(new ErrorModal("添加失败"));
    const SELECT_COURSE = `
        SELECT *
        FROM course
        WHERE course_id = '${id}'`;
    const INSERT_COURSE = `
        INSERT INTO course(course_id, course_name, course_cycle, course_credit, course_intro, pre_id, school_id)
        VALUES ('${id}','${name}',${cycle},${credit},'${intro}','${prevId}', '${schoolId}');
    `;
    execute(SELECT_COURSE).then(values => {
        if (values.length) return res.json(new ErrorModal("课程已存在"));
        execute(INSERT_COURSE).then(v => {
            if (v.affectedRows) return res.json(new SuccessModal("添加成功"));
            res.json(new ErrorModal("添加失败"));
        }).catch(err => {
            console.log(err);
            console.log("网路异常");
        });
    });
}

function Update(req, res, next) {
    const reqBody = req.query;
    const { id, cycle, name, credit, intro, prevId, schoolId } = reqBody;
    if (!id || cycle < 0 || !name || credit < 0 || !schoolId) return res.json(new ErrorModal("更新失败"));
    const SELECT_COURSE = `
        SELECT *
        FROM course
        WHERE course_id = '${id}'`;
    const UPDATE_COURSE = `
        UPDATE course
        SET course_name = '${name}',
            course_cycle = ${cycle},
            course_credit = ${credit},
            course_intro = '${intro}',
            pre_id = '${prevId}',
            school_id = '${schoolId}'
        WHERE course_id = '${id}';
    `;
    execute(SELECT_COURSE).then(values => {
        if (!values.length) return res.json(new ErrorModal("课程不存在"));
        execute(UPDATE_COURSE).then(v => {
            if (v.affectedRows) return res.json(new SuccessModal("更新成功"));
            res.json(new ErrorModal("更新失败"));
        }).catch(err => {
            console.log(err);
            console.log("网路异常");
        });
    });;
}

module.exports = {
    List,
    Del,
    Detail,
    Add,
    Update,
};
