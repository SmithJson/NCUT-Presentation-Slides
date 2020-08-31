/*
 * @Author: zhangl
 * @Date: 2020-05-23 02:25:21
 * @LastEditors: zhangl
 * @LastEditTime: 2020-06-05 12:14:18
 * @FilePath: /server/routes/login.js
 * @Description: 用户登录模块
 */
const xss = require('xss');
const { SuccessModal, ErrorModal } = require("../models");
const { execute } = require("../lib/mysql");
const { createToken } = require("../tools/auth");

function login(req, res, next) {
  const { username, password } = req.query;
  if (!username || !password) {
    res.json(new ErrorModal("账号或密码错误"));
    return;
  }
  let SELECT_USERS = `
  SELECT *
  FROM users, users_school_dept
  WHERE users.is_delete = 0
    AND users.users_id = users_school_dept.users_id
    AND users.users_id = '${xss(escape(username))}'
    AND password = '${xss(escape(password))}'
  `;
  let SELECT_AUTH = `
  SELECT remark, permission
  FROM auth
  WHERE is_delete = 0
    AND auth_id in (
      SELECT auth_id
      FROM role_auth
      WHERE is_delete = 0
        AND role_id IN (
          SELECT role_id
          FROM users_role
          WHERE is_delete = 0
            AND users_id = '${xss(escape(username))}'
      )
  );
  `;
  let SELECT_ROLE = `
  SELECT role_title, remark
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
            AND users_id = '${xss(escape(username))}'
      )
  );
  `
  Promise.all([
    execute(SELECT_USERS),
    execute(SELECT_AUTH),
    execute(SELECT_ROLE),
  ]).then(values => {
    const [user, auth, role] = values;
    const [userRow] = user;
    const [roleRow] = role;
    if (!userRow) {
      return res.json(new ErrorModal("账号或密码错误"));
    }
    if (!Number(userRow.is_registered)) return res.json(new ErrorModal("用户不存在"));
    const permission = (auth || []).map(item => item.remark);
    const token = createToken({
      id: userRow.users_id,
      permission: auth || [],
      role: roleRow.remark || "非法用户",
      roleId: roleRow.role_title,
      schoolId: userRow.school_id,
    });
    const newValue = {
      no: userRow.users_id,
      username: userRow.users_name,
      gender: userRow.users_gender,
      age: userRow.users_age,
      create_time: userRow.create_time,
      avatar: userRow.users_avatar,
      tel: userRow.users_tel,
      role: roleRow.remark || "非法用户",
      permission,
    };
    res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000, });
    res.json(new SuccessModal(newValue));
  }).catch(err => {
    console.log(err);
    return res.json(new ErrorModal("网络错误"));
  })
}

module.exports = login;