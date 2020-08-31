/*
 * @Author: zhangl
 * @Date: 2020-05-19 14:55:36
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-19 19:52:14
 * @FilePath: /clinet/src/api/course.js
 * @Description: 课程管理
 */
import { Http } from '../tools';

const courseUrl = '/course';

export const fetchCourseList = params => Http.ajax('GET', courseUrl, params, { noLoading: params.noLoading });
export const deleteCourse = ({ id }) => Http.ajax('DELETE', `${courseUrl}/${id}`);
export const fetchCourse = ({ id }) => Http.ajax('GET', `${courseUrl}/${id}`);
export const updateCourse = ({ id, params }) => {
    if (!id) return Http.ajax('POST', courseUrl, params);
    return Http.ajax('POST', `${courseUrl}/${id}`, params);
};
