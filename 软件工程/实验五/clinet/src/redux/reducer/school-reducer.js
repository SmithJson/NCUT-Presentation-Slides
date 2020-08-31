/*
 * @Author: zhangl
 * @Date: 2020-05-03 12:49:36
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-18 17:13:07
 * @FilePath: /clinet/src/redux/reducer/school-reducer.js
 * @Description: 面包屑 reducer
 */
import { CHANGE_SCHOOL } from '../action';

const schoolReducer = (state = [], action) => {
    switch (action.type) {
        case CHANGE_SCHOOL:
            return [...action.value];
        default:
            return state;
    }
};

export { schoolReducer };
