/*
 * @Author: zhangl
 * @Date: 2020-05-18 15:53:12
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-20 18:24:58
 * @FilePath: /clinet/src/api/teacher.js
 * @Description: 教师管理 api
 */
import { Http } from '../tools';

const teacherUlr = '/teacher';

export const fetchTeacherList = params => Http.ajax('GET', teacherUlr, params, { noLoading: params.noLoading });
export const deleteTeacher = ({ id }) => Http.ajax('DELETE', `${teacherUlr}/${id}`);
export const fetchTeacher = ({ id }) => Http.ajax('GET', `${teacherUlr}/${id}`);
export const updateTeacher = ({ id, params }) => {
    if (!id) return Http.ajax('POST', teacherUlr, params);
    return Http.ajax('POST', `${teacherUlr}/${id}`, params);
};
