/*
 * @Author: zhangl
 * @Date: 2020-05-07 00:39:35
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-27 10:41:27
 * @FilePath: /clinet/src/tools/http/index.js
 * @Description: http
 */
import jsonp from 'jsonp';
import axios from 'axios';
import { message } from 'antd';
import config from './config';
import { RES_CODE } from '../../config';

const loading = document.getElementById('loading-wrapper');

class Http {
    static id = null;

    static #interface = axios.create({
        ...config,
    })

    // 拦截器对象
    static #interceptors = {
        response: () => {
            this.#interface.interceptors.response.use(response => {
                // 请求处理
                if (response.status < 200 || response.status >= 500) return Promise.reject(response);
                const { data } = response;
                if (this.id) clearTimeout(this.id);
                this.id = setTimeout(() => {
                    loading.style.display = 'none';
                }, 500);
                switch (data.code) {
                    case RES_CODE.OK:
                        return data.result;
                    case RES_CODE.FORBIDDEN:
                        message.error({ content: data.result });
                        return Promise.reject(new Error(`response code is ${RES_CODE.FORBIDDEN}`));
                    default:
                        message.error({ content: data.result });
                        return Promise.reject(new Error('Fuck!!! what happened ???'));
                }
            }, error => {
                loading.style.display = 'none';
                message.error({ content: '网络错误' });
                return Promise.reject(error);
            });
        },
    }

    static init = () => {
        this.#interceptors.response();
    }

    /**
    * get 方式跨域访问
     * @param {String} url
     * @param {String} param
     * @returns {Promise}
     */

    static jsonP(url, params) {
        return new Promise((resolve, reject) => {
            jsonp(url, { params }, (err, res) => {
                if (res.error === 0) resolve(res.results);
                else reject(err);
            });
        });
    }

    /**
     * axios 请求接口
     * @param {String} method 请求方式
     * @param {String} url 请求路径
     * @param {Object} params 请求参数
     * @param {Object} options axios 其他配置项
     * @description：任何方式请求，传递参数统一使用 params 字段
     */

    static ajax(method, url, params, options = {}) {
        const newOptions = {
            method: method.toLowerCase(),
            url,
            ...options,
        };
        if (!options.noLoading) {
            loading.style.display = 'flex';
        }
        if (!/delete|get|head/ig.test(method)) newOptions.data = params;
        else newOptions.params = params;
        return this.#interface.request(newOptions).then(data => data);
    }
}

Http.init();

export default Http;
