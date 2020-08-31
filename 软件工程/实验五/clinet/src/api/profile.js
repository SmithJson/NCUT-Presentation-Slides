/*
 * @Author: zhangl
 * @Date: 2020-05-21 02:02:07
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-21 02:23:32
 * @FilePath: /clinet/src/api/profile.js
 * @Description: 个人信息
 */
import { Http } from '../tools';

const profileUlr = '/profile';

export const fetchProfile = params => Http.ajax('GET', profileUlr, params);
