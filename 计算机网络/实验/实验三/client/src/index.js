/*
 * @Author: zhangl
 * @Date: 2020-05-31 18:21:30
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-31 20:32:04
 * @FilePath: /client/src/index.js
 * @Description: Do not edit
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import IRouter from './IRouter';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <IRouter />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
