/*
 * @Author: zhangl
 * @Date: 2020-05-02 21:21:36
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-26 22:13:14
 * @FilePath: /clinet/src/api/common.js
 * @Description: 公共接口
 */
import { Http } from '../tools';
import { AK } from '../config';

const weatherUrl = 'http://api.map.baidu.com/telematics/v3/weather';
const authUrl = '/login';
const schoolUrl = '/school';
const timesUrl = '/times';
const statistic = '/statistical';

// 获取百度天气
const getWeather = city => Http.jsonP(
    `${weatherUrl}?location=${encodeURIComponent(city)}&output=json&ak=${AK}`,
);

// 获取用户信息
const fetchAuth = params => Http.ajax('POST', authUrl, params);

// 获取学校列表
const fetchSchool = params => Http.ajax('GEt', schoolUrl, params, { noLoading: (params || {}).noLoading });
// 获取专业列表
const fetchDept = id => Http.ajax('GET', `${schoolUrl}/${id}`);
// 获取时间段
const fetchTimes = () => Http.ajax('GET', timesUrl);
// 获取统计
const fetchStatistic = () => Http.ajax('GET', statistic);

export {
    getWeather,
    fetchAuth,
    fetchSchool,
    fetchDept,
    fetchTimes,
    fetchStatistic,
};
