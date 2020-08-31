/*
 * @Author: zhangl
 * @Date: 2020-05-02 22:35:41
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-20 00:53:16
 * @FilePath: /clinet/src/tools/base.js
 * @Description: 基础工具
 */
import { TIME_REGEX } from '../config';

/**
 * 格式化时间
 * @param {Date} date
 * @param {String} regex 时间格式正则字符串，例如（YYYY-MM-DD HH:mm:ss）
 * @returns {String}
 */

export const formatTime = (date, regex = TIME_REGEX) => {
    const time = new Date(date);
    return regex.replace(
        /(Y+)\1|(M+)\1|(D+)\1|(H+)\1|(m+)\1|(s+)\1/g,
        (match, $1, $2, $3, $4, $5, $6) => {
            if ($1) return time.getFullYear();
            if ($2) return (time.getMonth() + 1).toString().padStart(2, '0');
            if ($3) return time.getDate().toString().padStart(2, '0');
            if ($4) return time.getHours().toString().padStart(2, '0');
            if ($5) return time.getMinutes().toString().padStart(2, '0');
            if ($6) return time.getSeconds().toString().padStart(2, '0');
            return '';
        },
    );
};


/**
 *
 * 判断字符是2字节，还是4字节
 * @param {String} character
 */

export const is32Bit = character => character.codePointAt(0) > 0xFFFF;

/**
 * 设置 localStorage
 * @param {string} key
 * @param {String} value
 * @returns {String}
 */

export const setItem = localStorage.setItem.bind(localStorage);

/**
 * 获取 localStorage
 * @param {string} key
 * @returns {String}
 */

export const getItem = localStorage.getItem.bind(localStorage);

/**
 * 删除 localStorage
 * @param {string} key
 */

export const removeItem = localStorage.removeItem.bind(localStorage);
