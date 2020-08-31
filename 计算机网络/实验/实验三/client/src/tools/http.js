/*
 * @Author: zhangl
 * @Date: 2020-05-31 21:57:18
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-31 22:12:00
 * @FilePath: /client/src/tools/http.js
 * @Description: Do not edit
 */
import axios from 'axios';

class Http {
    constructor() {
        this._axios = axios.create({
            baseURL: 'http://localhost:3000/api',
        });
        this.get = (url, params) => this._axios.get(url, { params });
        this.post = (url, data) => this._axios.post(url, data)
    }
}

const http = new Http();

export default http;
