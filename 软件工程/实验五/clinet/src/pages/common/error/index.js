/*
 * @Author: zhangl
 * @Date: 2020-04-29 21:13:40
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-10 23:03:08
 * @FilePath: /react-cms-webpack/src/pages/common/error/index.js
 * @Description: 错误页面
 */
import React from 'react';
import './index.less';

const getErrorPage = ({ path }) => {
    const str = path.replace('/', '');
    switch (str) {
        case '403':
            return {
                title: str,
                tip: "Opps, You're lost.",
                info: '请联系管理员开通权限',
            };
        case '500':
            return {
                title: str,
                tip: 'Something is wrong here. Method not allowed!',
                info: '服务端发生未知错误',
            };
        default:
            return {
                title: str,
                tip: "Opps, You're lost.",
                info: '页面已失联，请访问其他资源',
            };
    }
};

export default props => {
    const goBack = () => props.history.goBack();
    const errorPage = getErrorPage(props.match || {});
    return (
        <div className="miss-container">
            <div className="title">{errorPage.title}</div>
            <div className="info-wrapper">
                <div className="tip">{errorPage.tip}</div>
                <p className="info">{errorPage.info}</p>
            </div>
            <button className="link" onClick={goBack}>返回</button>
        </div>
    );
};
