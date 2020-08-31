/*
 * @Author: zhangl
 * @Date: 2020-05-03 12:54:24
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-25 16:01:08
 * @FilePath: /clinet/src/redux/reducer/index.js
 * @Description: reducer 管理
 */
import { combineReducers } from 'redux';
import { breadcrumbReducer } from './breadcrumb-reducer';
import { menuReducer, routesReducer } from './routes-reducer';
import { schoolReducer } from './school-reducer';
import { timesReducer } from './times-reducer';

export default combineReducers({
    breadcrumb: breadcrumbReducer,
    menuRoutes: menuReducer,
    routesFlat: routesReducer,
    school: schoolReducer,
    times: timesReducer,
});
