/*
 * @Author: zhangl
 * @Date: 2020-04-26 23:42:28
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-16 16:32:01
 * @GitHub: https://github.com/SmithJson
 * @FilePath: /clinet/src/components/NavLeft/index.js
 * @Description: NavLeft
 */
import React, { Component } from 'react';
import { Menu, Switch } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { LOGO_PNG } from '../../images';
import project from '../../config/project.json';
import './index.less';

const { SubMenu } = Menu;

@connect(
    state => ({ ...state }),
)
export default class NavLeft extends Component {
    state = {
        theme: 'light',
    };

    createMenuByRouteConfig = (config = []) => config.map(route => {
        if (!route.hidden) {
            if (!route.routes) {
                return (
                    <Menu.Item key={route.path} title={route.title}>
                        {route.icon}
                        <NavLink to={route.path}>{route.title}</NavLink>
                    </Menu.Item>
                );
            }
            return (
                <SubMenu
                    key={route.path}
                    title={(
                        <span>
                            {route.icon}
                            <span>{route.title}</span>
                        </span>
                    )}
                >
                    {this.createMenuByRouteConfig(route.routes)}
                </SubMenu>
            );
        }
        return null;
    });

    handleChangeMenuStyle = () => {
        const { state } = this;
        const { theme } = state;
        const curTheme = theme === 'light' ? 'dark' : 'light';
        this.setState({
            theme: curTheme,
        });
    };

    render() {
        const { theme } = this.state;
        const { menuRoutes, breadcrumb } = this.props;
        return (
            <div className={`nav-left ${theme}`}>
                <div className="logo-wrapper">
                    <img src={LOGO_PNG} alt={LOGO_PNG} className="logo" />
                    <div className="system-name">
                        {project.name}
                    </div>
                </div>
                <div className="menu-wrapper">
                    <div className="style-change-button">
                        <Switch onChange={this.handleChangeMenuStyle} />
                        <span>修改主题</span>
                    </div>
                    <Menu theme={theme} mode="inline" selectedKeys={breadcrumb.map(item => item.static || item.path)}>
                        {this.createMenuByRouteConfig(menuRoutes)}
                    </Menu>
                </div>
            </div>
        );
    }
}
