/*
 * @Author: zhangl
 * @Date: 2020-05-13 10:27:47
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-26 21:16:45
 * @FilePath: /server/routes/index.js
 * @Description: index router
 */
const express = require("express");
const router = express.Router();
const { validate } = require("../tools/auth");
const loginModule = require("./login");
const studentModule = require("./student");
const timesModule = require("./times");
const schoolModal = require("./school");
const teacherModal = require("./teacher");
const courseModal = require("./course");
const TeachModule = require("./teach");
const ElectiveModule = require("./elective");
const ProfileModule = require("./profile");
const StatisticalModule = require("./statistic");

// 公共
router.post("/login", loginModule);
router.get("/school", schoolModal.school);
router.get("/school/:id", schoolModal.dept);
router.get("/times", timesModule);

// 学生
router.get("/student", [validate], studentModule.List);
router.get("/student/:id", [validate], studentModule.Detail);
router.post("/student", [validate], studentModule.Add);
router.post("/student/:id", [validate], studentModule.Update);
router.delete("/student/:id", [validate], studentModule.Del);

// 老师
router.get("/teacher", [validate], teacherModal.List);
router.get("/teacher/:id", [validate], teacherModal.Detail);
router.post("/teacher", [validate], teacherModal.Add);
router.post("/teacher/:id", [validate], teacherModal.Update);
router.delete("/teacher/:id", [validate], teacherModal.Del);

// 课程
router.get("/course", [validate], courseModal.List);
router.delete("/course/:id", [validate], courseModal.Del);
router.get("/course/:id", [validate], courseModal.Detail);
router.post("/course", [validate], courseModal.Add);
router.post("/course/:id", [validate], courseModal.Update);

// 授课
router.get("/teach", [validate], TeachModule.List);
router.delete("/teach/:id", [validate], TeachModule.Del);
router.get("/teach/:id", [validate], TeachModule.Detail);
router.post("/teach/:id", [validate], TeachModule.Update);
router.post("/teach", [validate], TeachModule.Add);
router.get("/choose/:id", [validate], TeachModule.Choose);

// 选课
router.get("/elective", [validate], ElectiveModule.List);
router.delete("/elective/:id", [validate], ElectiveModule.Del);
router.get("/elective/:id", [validate], ElectiveModule.Detail);
router.post("/elective/:id", [validate], ElectiveModule.Update);
router.post("/elective", [validate], ElectiveModule.Add);
router.get("/statistical", [validate], StatisticalModule.Detail);

// 个人
router.get("/profile", ProfileModule.Detail);

module.exports = router;
