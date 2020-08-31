/*
 * @Author: zhangl
 * @Date: 2020-05-03 21:32:02
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-25 16:09:18
 * @FilePath: /clinet/src/routers/router.js
 * @Description: Do not edit
 */
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { nonAuthRoutes } from '../config/menuConfig';
import App from '../App';
import Auth from './Auth';

export default class IRouter extends React.Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        {nonAuthRoutes.map(route => <Route {...route} />)}
                        <Switch>
                            <Auth />
                        </Switch>
                    </Switch>
                </App>
            </HashRouter>
        );
    }
}
