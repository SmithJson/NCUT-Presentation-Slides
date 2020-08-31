/*
 * @Author: zhangl
 * @Date: 2020-05-23 16:39:23
 * @LastEditors: zhangl
 * @LastEditTime: 2020-06-05 13:29:09
 * @FilePath: /server/routes/student.js
 * @Description: 学生模块
 */
const xss = require('xss');
const { SuccessModal, ErrorModal } = require("../models");
const { execute } = require("../lib/mysql");
const { decodeToken } = require("../tools/auth");

function List(req, res, next) {
    const token = decodeToken(req);
    let SELECT_STUDENT = `
        SELECT *
        FROM users,
            users_school_dept
        WHERE users.users_id = users_school_dept.users_id
        AND users.is_delete = 0
        AND users.users_id IN (
            SELECT users_id
            FROM users_role
            WHERE role_id IN (
                SELECT role_id
                FROM role
                WHERE role_title = 'student'
            )
        )
    `;
    const { scene, page, size = 10, sId, search } = req.query;
    if (search) {
        SELECT_STUDENT += `
            AND users_name LIKE '%${search}%'
        `;
    }
    if (sId) {
        SELECT_STUDENT += `
            AND users.users_id = '${xss(escape(sId))}'
        `;
    }
    if (/school_admin/.test(token.roleId)) {
        console.log(token.schoolId);
        SELECT_STUDENT += `
            AND school_id = '${token.schoolId}'
        `
    }
    execute(SELECT_STUDENT).then(values => {
        let newValue = values
            .map(item => ({
                id: item.users_id,
                username: item.users_name,
                value: item.users_name,
                gender: item.users_gender,
                age: item.users_age,
                avatar: item.users_avatar,
                schoolId: item.school_id,
                tel: item.users_tel,
                email: item.users_email,
                registered: item.is_registered,
            }));
        if (page) newValue = newValue.slice((page - 1) * size, (page - 1) * size + Number(size));
        res.json(new SuccessModal(page ? { list: newValue, total: newValue.length } : newValue));
    }).catch(err => {
        console.log(err);
        res.json(new ErrorModal("查询失败"));
    });
}

function Del(req, res, next) {
    const { id } = req.params;
    if (!id) return res.json(new ErrorModal("学生不存在"));
    const DELETE_STUDENT = `UPDATE users SET is_delete = 1 WHERE users_id = '${xss(escape(id))}'`;
    const SELECT_STUDENT = `SELECT * FROM users WHERE users_id = '${xss(escape(id))}'`;
    execute(SELECT_STUDENT).then(values => {
        if (!values.length) return res.json(new ErrorModal("学生不存在"));
        return execute(DELETE_STUDENT).then(values => {
            if (values.affectedRows) return res.json(new SuccessModal("删除成功"));
        });
    }).catch(err => {
        console.log(err);
        res.json(new ErrorModal("删除失败"));
    });
}

function Detail(req, res, next) {
    const { id } = req.params;
    if (!id) return res.json(new ErrorModal("学生不存在"));
    const SELECT_STUDENT = `SELECT * FROM users WHERE users_id = '${xss(escape(id))}'`;
    const SELECT_SCHOOL_DEPT = `SELECT * FROM users_school_dept WHERE users_id = '${xss(escape(id))}'`;
    let SELECT_ROLE = `
        SELECT remark
        FROM role
        WHERE is_delete = 0
            AND role_id in (
            SELECT role_id
            FROM role_auth
            WHERE is_delete = 0
                AND role_id IN (
                SELECT role_id
                FROM users_role
                WHERE is_delete = 0
                    AND users_id = '${xss(escape(id))}'
            )
        );
    `
    Promise.all([
        execute(SELECT_STUDENT),
        execute(SELECT_SCHOOL_DEPT),
        execute(SELECT_ROLE),
    ]).then(values => {
        const [user, school, role] = values;
        if (!user.length) return res.json(new ErrorModal("学生不存在"));
        const [userRow] = user;
        const [schoolRow] = school;
        const [roleRow] = role
        const newValue = {
            role: roleRow.remark,
            no: userRow.users_id,
            username: userRow.users_name,
            gender: userRow.users_gender,
            age: userRow.users_age,
            avatar: userRow.users_avatar,
            email: userRow.users_email,
            tel: userRow.users_tel,
            schoolId: schoolRow.school_id,
            deptId: schoolRow.dept_id,
            registered: userRow.is_registered,
        };
        res.json(new SuccessModal(newValue));
    });
}

function Add(req, res, next) {
    const reqBody = req.body;
    if (!reqBody.no || !reqBody.username || !reqBody.tel || !reqBody.schoolId
        || !reqBody.deptId) {
        res.json(new ErrorModal('添加失败'));
        return;
    }
    const INSERT_STUDENT = `
        INSERT INTO users(users_id, users_name, users_gender, users_age, users_avatar, users_tel, users_email, is_registered)
        VALUES ('${reqBody.no}','${reqBody.username}','${reqBody.gender}',${reqBody.age},'${reqBody.avatar}','${reqBody.tel}','${reqBody.email}', '${reqBody.registered}');
    `;
    const INSERT_USERS_SCHOOL_DEPT = `
        INSERT INTO users_school_dept(dept_id, users_id, school_id)
        VALUES ('${reqBody.deptId}', '${reqBody.no}', '${reqBody.schoolId}');
    `;
    const INSERT_USERS_ROLE = `
        INSERT INTO users_role(users_id, role_id)
        SELECT '${reqBody.no}', (SELECT role_id FROM role where role_title = 'student');
    `;
    const SELECT_STUDENT = `SELECT * FROM users WHERE users_id = '${xss(escape(reqBody.no))}'`;
    execute(SELECT_STUDENT).then(values => {
        if (values.length) return res.json(new ErrorModal("学生已存在"));
        return execute(INSERT_STUDENT).then(v => {
            if (v.affectedRows) {
                return Promise.all([
                    execute(INSERT_USERS_SCHOOL_DEPT),
                    execute(INSERT_USERS_ROLE),
                ]).then(() => {
                    res.json(new SuccessModal("添加成功"));
                });
            }
            execute("rollback").then(() => {
                res.json(new ErrorModal("添加失败"));
            });
        });
    }).catch(err => {
        console.log(err);
        res.json(new ErrorModal("网络错误"));
    });
}

function Update(req, res, next) {
    const { id } = req.params;
    const reqBody = req.body;
    if (!id) return res.json(new ErrorModal("学生不存在"));
    if (!id || !reqBody.username || !reqBody.tel || !reqBody.schoolId
        || !reqBody.deptId) {
        res.json(new ErrorModal('更新失败'));
        return;
    }
    const UPDATE_STUDENT = `
        UPDATE users
        SET users_name = '${reqBody.username}',
            users_age = ${reqBody.age},
            users_gender = '${reqBody.gender}',
            users_tel = '${reqBody.tel}',
            users_id = '${reqBody.no || id}',
            is_registered = '${reqBody.registered}',
            users_avatar = '${reqBody.avatar}'
        WHERE users_id = '${id}'
    `;
    const UPDATE_USERS_SCHOOL_DEPT = `
        UPDATE users_school_dept
        SET dept_id = '${reqBody.deptId}',
            users_id = '${reqBody.no || id}',
            school_id = '${reqBody.schoolId}'
        WHERE users_id = '${id}'
    `;
    const SELECT_STUDENT = `SELECT * FROM users WHERE users_id = '${xss(escape(id))}'`;
    execute(SELECT_STUDENT).then(values => {
        if (!values.length) return res.json(new ErrorModal("学生不存在"));
        return execute(UPDATE_STUDENT).then(v => {
            if (v.affectedRows) return execute(UPDATE_USERS_SCHOOL_DEPT).then(() => {
                res.json(new SuccessModal("更新成功"));
            });
            execute("rollback").then(() => {
                res.json(new ErrorModal("更新失败"));
            });
        });
    }).catch(err => {
        console.log(err);
        res.json(new ErrorModal("网络错误"));
    });
}

module.exports = {
    List,
    Del,
    Add,
    Update,
    Detail,
};
