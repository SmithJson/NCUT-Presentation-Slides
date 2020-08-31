/*
 * @Author: zhangl
 * @Date: 2020-05-04 22:47:32
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-14 17:33:15
 * @FilePath: /clinet/src/redux/reducer/routes-reducer.js
 * @Description: 路由守卫 reducer
 */
import { CHANGE_ROUTES, CHANGE_MENU } from '../action';

const routesReducer = (state = [], action) => {
    switch (action.type) {
        case CHANGE_ROUTES:
            return [...action.value];
        default:
            return [...state];
    }
};

const menuReducer = (state = [], action) => {
    switch (action.type) {
        case CHANGE_MENU:
            return [...action.value];
        default:
            return [...state];
    }
};

export {
    routesReducer,
    menuReducer,
};
