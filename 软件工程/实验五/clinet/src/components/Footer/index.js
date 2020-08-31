/*
 * @Author: zhangl
 * @Date: 2020-04-26 23:42:12
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-03 22:28:06
 * @GitHub: https://github.com/SmithJson
 * @FilePath: /react-cms-webpack/src/components/Footer/index.js
 * @Description: Footer 组件
 */
import React, { PureComponent } from 'react';
import project from '../../config/project.json';
import './index.less';

export default class Footer extends PureComponent {
    state = {};

    componentDidMount() {
        this.setState({
            ...project,
        });
    }

    render() {
        const { state } = this;
        const { copyright, effective } = state;
        return (
            <footer className="footer">
                <div>{`Copyright © ${effective} juejin.com All Rights Reserved`}</div>
                <div>{`版权所有 ${copyright}`}</div>
            </footer>
        );
    }
}
