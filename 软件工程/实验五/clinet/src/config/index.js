/*
 * @Author: zhangl
 * @Date: 2020-04-29 10:51:03
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-24 02:06:54
 * @FilePath: /clinet/src/config/index.js
 * @Description: 常量配置
 */
// 代码执行环境
export const ENV = NODE_ENV;

// 百度 AK
export const AK = '3p49MVra6urFRGOT9s8UBWr2';

// 时间格式
export const TIME_REGEX = 'YYYY-MM-DD HH:mm:ss';

// 性别
export const GENDER = {
    male: '男',
    female: '女',
    unknown: '保密',
};

// 正则
export const REGEXP = {
    phone: /^1[3456789]\d{9}$/, // 手机号
};

// 课程状态
export const TEACH_STATE = {
    START: '授课中',
    END: '已结课',
};

// 星期
export const WEEK = {
    MON: '周一',
    TUES: '周二',
    WED: '周三',
    THUR: '周四',
    FRI: '周五',
    SAT: '周六',
    SUN: '周日',
};

// 课程段
export const COURSE_SEGMENT = {
    '8:00-8:45': '第1节',
    '8:55-9:40': '第2节',
    '9:50-10:35': '第3节',
    '10:45-11:30': '第4节',
    '13:00-13:45': '第5节',
    '13:55:00-14:40': '第6节',
    '14:50:00-15:35': '第7节',
    '15:45:00-16:30': '第8节',
    '18:00-18:45': '第9节',
    '18:55-19:40': '第10节',
    '19:50-8:35': '第11节',
};

// 是否中签
export const BINGO = {
    1: '已中签',
    0: '未中签',
};

// 是否注册
export const REGISTERED = {
    1: '已注册',
    0: '未注册',
};

// const URL = {
//     port: 3000,
//     // port: 7300,
//     // pathname: '5ebcc9aff367bc4fbf004974/SCMS',
//     pathname: 'api',
// };
// http://localhost:3000/api/student
// const createRequestUrlByEnv = ({
//     // env = ENV,
//     protocol = 'http',
//     domain = 'localhost',
//     port = 80,
//     pathname = '',
// }) => `${protocol}://${domain}:${port}/${pathname}`;
// 请求的基础 url
// export const BASE_URL = createRequestUrlByEnv(URL);
export const BASE_URL = '/api';

// 响应状态码
export const RES_CODE = {
    OK: 0, // 请求成功
    FORBIDDEN: -1, // 禁止请求,
};
