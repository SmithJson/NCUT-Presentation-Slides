/*
 * @Author: zhangl
 * @Date: 2020-05-31 19:42:51
 * @LastEditors: zhangl
 * @LastEditTime: 2020-06-01 19:28:57
 * @FilePath: /client/src/IRouter.js
 * @Description: Do not edit
 */
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import ChatRoom from './pages/ChatRoom';
import Server from './pages/Server';

export default class IRouter extends Component {
    render() {
        return (
            <App>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/server" component={Server} />
                        <Route exact path="/chat" component={ChatRoom} />
                        <Redirect to="login" />
                    </Switch>
                </BrowserRouter>
            </App>
        );
    }
}
