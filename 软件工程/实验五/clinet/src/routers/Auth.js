/*
 * @Author: zhangl
 * @Date: 2020-05-03 21:31:47
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-25 16:11:59
 * @FilePath: /clinet/src/routers/Auth.js
 * @Description: Auth
 */
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { match } from 'path-to-regexp';
import { connect } from 'react-redux';
import {
    handleChangeRoutesFlat,
    handleChangeRoutesMenu,
    handleChangeSchool,
    handleGetTimes,
} from '../redux/action';
import { getItem } from '../tools';
import { fetchSchool, fetchTimes } from '../api';
import { authRoutes } from '../config/menuConfig';
import Admin from '../Admin';

@connect(
    state => ({ ...state }),
    {
        handleChangeRoutesFlat,
        handleChangeRoutesMenu,
        handleChangeSchool,
        handleGetTimes,
    },
)
export default class Auth extends Component {
    componentDidMount() {
        this.init();
    }

    init = () => {
        this.props.handleChangeRoutesFlat(this.getFlatRoutes(authRoutes));
        this.props.handleChangeRoutesMenu(this.getMenuRoutes(authRoutes));
        fetchSchool().then(res => this.props.handleChangeSchool(res));
        fetchTimes().then(res => this.props.handleGetTimes(res));
    }

    getFlatRoutes = (routes = [], pid = 0) => {
        const temp = [];
        const { length } = routes;
        for (let i = 0; i < length; i += 1) {
            if (!routes[i].routes) {
                routes[i].pid = pid;
                routes[i].id = pid * 100 + 1;
                temp.push(routes[i]);
            } else {
                routes[i].pid = 0;
                routes[i].id = i + 1;
                temp.push(routes[i]);
                temp.push(...this.getFlatRoutes(routes[i].routes, i + 1));
            }
        }
        return temp;
    }

    getMenuRoutes = (routes = []) => {
        const temp = [];
        const user = JSON.parse(getItem('USER_INFO') || '{}');
        const menus = user.permission || [];
        const { length } = routes;
        if (!user.no) return temp;
        for (let i = 0; i < length; i += 1) {
            if (!routes[i].routes || routes[i].component) {
                const item = { ...routes[i] };
                if (routes[i].component) delete item.routes;
                if (menus.includes(routes[i].permission) || !routes[i].permission) temp.push(item);
            } else {
                const result = this.getMenuRoutes(routes[i].routes);
                if (result.length) {
                    const item = { ...routes[i] };
                    // eslint-disable-next-line max-depth
                    if (result.length < routes[i].routes.length) item.routes = result;
                    temp.push(item);
                }
            }
        }
        return temp;
    }

    getRoute = () => {
        const { routesFlat, location } = this.props;
        const { pathname } = location;
        const { length } = routesFlat;
        const user = JSON.parse(getItem('USER_INFO') || '{}');
        const menus = user.permission || [];
        if (!routesFlat.length) return null;
        let legalRoute = null; // 匹配到的合法路由
        for (let i = 0; i < length; i += 1) {
            const mathRoute = match(routesFlat[i].path);
            if (mathRoute(pathname)) {
                legalRoute = routesFlat[i];
                break;
            }
        }
        // 非法路由
        if (legalRoute === null && pathname !== '/') return <Redirect to="/404" />;
        if (pathname === '/') {
            if (!user.no) return <Redirect to="/login" />;
            return <Redirect to={'/profile' || '/403'} />;
        }
        // 非登录访问需要登录路由
        if (!user.no && legalRoute.auth) return <Redirect to="/login" />;
        // 非登录访问不需要登录路由
        if (!user.no && !legalRoute.auth) return <Admin><Route {...legalRoute} /></Admin>;
        // 登录访问没有访问权限路由
        if (!menus.includes(legalRoute.permission)) return <Redirect to="/403" />;
        // 登录访问具有访问权限路由
        return <Admin><Route {...legalRoute} /></Admin>;
    }

    render() {
        return this.getRoute();
    }
}
