/*
 * @Author: zhangl
 * @Date: 2020-05-20 01:43:11
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-27 10:12:57
 * @FilePath: /clinet/src/api/teach.js
 * @Description: 授课 api
 */
import { Http } from '../tools';

const teachUrl = '/teach';
const chooseUrl = '/choose';

export const fetchTeachList = params => Http.ajax('GET', teachUrl, params);
export const deleteTeach = ({ id }) => Http.ajax('DELETE', `${teachUrl}/${id}`);
export const fetchTeach = ({ id }) => Http.ajax('GET', `${teachUrl}/${id}`);
export const updateTeach = ({ id, params }) => {
    if (!id) return Http.ajax('POST', teachUrl, params);
    return Http.ajax('POST', `${teachUrl}/${id}`, params);
};
export const fetchChoose = ({ id }) => Http.ajax('GET', `${chooseUrl}/${id}`);
