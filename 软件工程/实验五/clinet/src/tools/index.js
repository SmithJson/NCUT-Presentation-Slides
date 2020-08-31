/*
 * @Author: zhangl
 * @Date: 2020-04-29 11:18:17
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-20 00:57:09
 * @FilePath: /clinet/src/tools/index.js
 * @Description: 工具入口管理
 */
import Http from './http';
import {
    formatTime,
    setItem,
    getItem,
    removeItem,
    is32Bit,
} from './base';
import { createPagination, getBase64 } from './antd';

export {
    Http,
    formatTime,
    setItem,
    getItem,
    removeItem,
    createPagination,
    getBase64,
    is32Bit,
};
