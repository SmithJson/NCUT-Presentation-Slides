/*
 * @Author: zhangl
 * @Date: 2020-05-25 11:16:13
 * @LastEditors: zhangl
 * @LastEditTime: 2020-06-17 20:29:18
 * @FilePath: /server/routes/teach.js
 * @Description: 授课模块
 */
const { SuccessModal, ErrorModal } = require("../models");
const { execute } = require("../lib/mysql");
const { decodeToken } = require("../tools/auth");

function List(req, res, next) {
    const token = decodeToken(req);
    const { page, search, size = 10 } = req.query;
    let SELECT_TEACH = `
        SELECT id, teacher_id, course.course_id, course_name, place, week, time, users_name, state
        FROM users_course_teach,
            users,
            course
        WHERE users_course_teach.teacher_id = users.users_id
        AND users_course_teach.course_id = course.course_id
        AND users.is_delete = 0
        AND users_course_teach.is_delete = 0
    `;
    if (search) {
        SELECT_TEACH += `
            AND course_name LIKE '%${search}%'
        `;
    }
    if (/school_admin/.test(token.roleId)) {
        SELECT_TEACH += `
            AND users.users_id IN (
                SELECT users_id
                FROM users_school_dept
                WHERE school_id = '${token.schoolId}'
            )
        `
    } else if (/teacher/.test(token.roleId)) {
        SELECT_TEACH += `
            AND users_course_teach.teacher_id = '${token.id}'
        `;
    }
    execute(SELECT_TEACH).then(values => {
        if (!page) return res.json("请求失败");
        const newValues = values
            .slice((page - 1) * size, (page - 1) * size + Number(size))
            .map(item => ({
                ...item,
                username: item.users_name,
                name: item.course_name,
                time: item.time.split(','),
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
    const DELETE_TEACH = `
        UPDATE users_course_teach
        SET is_delete = 1
        WHERE id = ${id};
    `;
    const SELECT_TEACH = `
        SELECT * FROM users_course_teach
        WHERE id = ${id}
    `;
    execute(SELECT_TEACH).then(values => {
        if (!values.length) return res.json(new ErrorModal("授课不存在"));
        execute(DELETE_TEACH).then(v => {
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
        SELECT teacher_id, course_name, users_course_teach.course_id, place, week, time, users_name, state, files
        FROM users_course_teach,
            users,
            course
        WHERE users_course_teach.teacher_id = users.users_id
        AND users_course_teach.course_id = course.course_id
        AND users.is_delete = 0
        AND id = ${id};
    `;
    execute(SELECT_TEACH).then(values => {
        const newValues = values
            .map(item => ({
                ...item,
                username: [{ id: item.teacher_id, value: item.users_name }],
                name: [{ id: item.course_id, value: item.course_name }],
                time: item.time.split(','),
                files: item.files ? JSON.parse(item.files) : [],
            }));
        if (values.length) return res.json(new SuccessModal(newValues[0]));
        return res.json("授课不存在");
    }).catch(err => {
        console.log(err);
        res.json(new ErrorModal("网络异常"));
    });
}

function Add(req, res, next) {
    const { courseId, place, teacherId, time = [], week, state, files = [
        "https://bpic.588ku.com/ad_diversion/19/06/26/a6e64f96ebdc1d2e3260109c38d6c40f.png",
        "https://bpic.588ku.com/ad_diversion/19/06/26/a6e64f96ebdc1d2e3260109c38d6c40f.png",
    ] } = req.query;
    if (!courseId || !place || !teacherId || !time.length
        || !week) return res.json(new ErrorModal("添加失败"));
    const INSERT_TEACH = `
        INSERT INTO users_course_teach(teacher_id, course_id, place, week, time, files, state)
        VALUES('${teacherId}', '${courseId}', '${place}', '${week}', '${time}', '${JSON.stringify(files)}', '${state}')
    `;
    execute(INSERT_TEACH).then(values => {
        if (values.affectedRows) return res.json(new SuccessModal("添加成功"));
        return res.json(new ErrorModal("添加失败"));
    }).catch(err => {
        console.log(err);
        res.json(new ErrorModal("网路异常"));
    });
}

function Update(req, res, next) {
    const { id } = req.params;
    const { courseId, place, teacherId, time = [], week, state, files = [] } = req.query;
    if (!id || !courseId || !place || !teacherId || !time.length
        || !week) return res.json(new ErrorModal("添加失败"));
    const UPDATE_TEACH = `
        UPDATE users_course_teach
        SET teacher_id = '${teacherId}',
            course_id = '${courseId}',
            place = '${place}',
            week = '${week}',
            time = '${time}',
            files = '${JSON.stringify(files)}',
            state = '${state}'
        WHERE id = ${id}
    `;
    const SELECT_TEACH = `SELECT * FROM users_course_teach WHERE id = ${id}`;
    execute(SELECT_TEACH).then(values => {
        if (!values.length) return res.json(new ErrorModal("授课不存在"));
        execute(UPDATE_TEACH).then(values => {
            if (values.affectedRows) return res.json(new SuccessModal("更新成功"));
            return res.json(new ErrorModal("更新失败"));
        }).catch(err => {
            console.log(err);
            res.json(new ErrorModal("网路异常"));
        });
    })
}

function Choose(req, res, next) {
    const token = decodeToken(req);
    const { id } = req.params;
    if (!id) return res.json(new ErrorModal("请选择选修课程"));
    const SELECT_COURSE_ELECTIVE = `
        SELECT *
        FROM users_course_elective, users_course_teach
        WHERE users_course_teach.course_id = users_course_elective.course_id
        AND student_id = '${token.id}'
        AND users_course_teach.course_id = '${id}';
    `;
    const SELECT_COURSE = `
        SELECT *
        FROM course
        WHERE course_id = '${id}'
    `;
    const SELECT_COURSE_TEACH = `
        SELECT *
        FROM users_course_elective, users_course_teach
        WHERE users_course_teach.course_id = users_course_elective.course_id
        AND bingo = 1
        AND student_id = '${token.id}'
    `;
    const INSERT_ELECTIVE = `
        INSERT INTO users_course_elective(student_id, course_id, score, state, bingo)
        VALUES('${token.id}', '${id}', 0, 'START', 0)
    `;
    execute(SELECT_COURSE_ELECTIVE).then(values => {
        console.log(values);
        if (values.length) return res.json(new ErrorModal("课程已选择"));
        execute(SELECT_COURSE).then(v1 => {
            const item = v1[0];
            if (!item.pre_id) {
                execute(INSERT_ELECTIVE).then(() => {
                    res.json(new SuccessModal("选课成功"));
                })
                return;
            }
            execute(SELECT_COURSE_TEACH).then(v2 => {
                const prvIds = item.pre_id.split(",");
                const courseIds = v2.map(row => row.course_id);
                const isPrevAll = prvIds.every(row => courseIds.includes(row));
                if (!isPrevAll) return res.json(new ErrorModal("您没有学习该课程的先修课程，不能进行选课！"));
                execute(INSERT_ELECTIVE).then(() => {
                    res.json(new SuccessModal("选课成功"));
                });
            });
        })
    }).catch(err => {
        console.log(err);
        res.json(new ErrorModal("网络异常"));
    });
}


module.exports = {
    List,
    Del,
    Detail,
    Add,
    Update,
    Choose,
};
