/*
 * @Author: zhangl
 * @Date: 2020-05-03 12:49:36
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-05 23:40:28
 * @FilePath: /react-cms-webpack/src/redux/reducer/breadcrumb-reducer.js
 * @Description: 面包屑 reducer
 */
import { CHANGE_BREADCRUMB } from '../action';

const breadcrumbReducer = (state = [], action) => {
    switch (action.type) {
        case CHANGE_BREADCRUMB:
            return [...action.value];
        default:
            return state;
    }
};

export { breadcrumbReducer };
