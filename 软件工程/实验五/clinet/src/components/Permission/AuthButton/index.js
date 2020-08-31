/*
 * @Author: zhangl
 * @Date: 2020-05-15 23:55:46
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-16 18:38:23
 * @FilePath: /clinet/src/components/Permission/AuthButton/index.js
 * @Description: 权限按钮
 */
import React, { Component } from 'react';
import { getItem } from '../../../tools';
import './index.less';

export default class AuthButton extends Component {
    state = {
        menus: [],
    }

    componentDidMount() {
        const user = JSON.parse(getItem('USER_INFO') || '{}');
        this.setState({
            menus: user.permission || [],
        });
    }

    render() {
        const { currentPage, data } = this.props;
        const btnGroup = [...data.keys()].map(item => {
            if (this.state.menus.includes(`${currentPage}.${item}`)) return data.get(item);
            return null;
        });
        return (
            <div className="auth-btn-container">
                {btnGroup}
            </div>
        );
    }
}
