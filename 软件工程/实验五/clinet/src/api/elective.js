/*
 * @Author: zhangl
 * @Date: 2020-05-20 02:12:24
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-20 02:13:55
 * @FilePath: /clinet/src/api/elective.js
 * @Description: 选课 api
 */
import { Http } from '../tools';

const electiveUlr = '/elective';

export const fetchElectiveList = params => Http.ajax('GET', electiveUlr, params);
export const deleteElective = ({ id }) => Http.ajax('DELETE', `${electiveUlr}/${id}`);
export const fetchElective = ({ id }) => Http.ajax('GET', `${electiveUlr}/${id}`);
export const updateElective = ({ id, params }) => {
    if (!id) return Http.ajax('POST', electiveUlr, params);
    return Http.ajax('POST', `${electiveUlr}/${id}`, params);
};
