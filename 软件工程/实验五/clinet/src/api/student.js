/*
 * @Author: zhangl
 * @Date: 2020-05-15 15:40:28
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-25 16:16:42
 * @FilePath: /clinet/src/api/student.js
 * @Description: 学生管理 api
 */
import { Http } from '../tools';

const studentUlr = '/student';

export const fetchStudentList = params => Http.ajax('GET', studentUlr, params, { noLoading: params.noLoading });
export const deleteStudent = ({ id }) => Http.ajax('DELETE', `${studentUlr}/${id}`);
export const fetchStudent = ({ id }) => Http.ajax('GET', `${studentUlr}/${id}`);
export const updateStudent = ({ id, params }) => {
    if (!id) return Http.ajax('POST', studentUlr, params);
    return Http.ajax('POST', `${studentUlr}/${id}`, params);
};
