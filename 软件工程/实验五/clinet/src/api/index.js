/*
 * @Author: zhangl
 * @Date: 2020-05-02 21:43:29
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-26 22:11:02
 * @FilePath: /clinet/src/api/index.js
 * @Description: 入口文件
 */
import {
    getWeather,
    fetchAuth,
    fetchSchool,
    fetchDept,
    fetchTimes,
    fetchStatistic,
} from './common';

import {
    fetchStudentList,
    deleteStudent,
    fetchStudent,
    updateStudent,
} from './student';

import {
    fetchTeacherList,
    fetchTeacher,
    deleteTeacher,
    updateTeacher,
} from './teacher';

import {
    fetchCourseList,
    fetchCourse,
    deleteCourse,
    updateCourse,
} from './course';

import {
    fetchTeachList,
    fetchTeach,
    deleteTeach,
    updateTeach,
    fetchChoose,
} from './teach';

import {
    fetchElectiveList,
    fetchElective,
    deleteElective,
    updateElective,
} from './elective';

import { fetchProfile } from './profile';

export {
    getWeather,
    fetchAuth,
    fetchStudentList,
    deleteStudent,
    fetchStudent,
    updateStudent,
    fetchSchool,
    fetchTeacherList,
    fetchTeacher,
    deleteTeacher,
    updateTeacher,
    fetchCourseList,
    fetchCourse,
    deleteCourse,
    updateCourse,
    fetchTeachList,
    fetchTeach,
    deleteTeach,
    updateTeach,
    fetchElectiveList,
    fetchElective,
    deleteElective,
    updateElective,
    fetchProfile,
    fetchDept,
    fetchTimes,
    fetchChoose,
    fetchStatistic,
};
