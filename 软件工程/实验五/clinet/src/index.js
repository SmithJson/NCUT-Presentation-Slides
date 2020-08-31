/*
 * @Author: zhangl
 * @Date: 2019-08-19 00:51:01
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-18 09:17:17
 * @Description: 项目入口文件
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider, message } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import generateStore from './redux/store';
import IRouter from './routers/router';
import './styles/common.less';
import './styles/loading.less';
import * as serviceWorker from './serviceWorker';

message.config({
    maxCount: 1,
});

ReactDOM.render(
    <Provider store={generateStore()}>
        <ConfigProvider locale={zhCN}>
            <IRouter />
        </ConfigProvider>
    </Provider>,
    document.getElementById('root'),
);

serviceWorker.unregister();

if (module.hot) {
    module.hot.accept();
}
