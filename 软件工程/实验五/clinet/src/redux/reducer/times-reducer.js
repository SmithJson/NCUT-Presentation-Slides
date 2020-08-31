/*
 * @Author: zhangl
 * @Date: 2020-05-25 15:51:17
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-25 16:00:40
 * @FilePath: /clinet/src/redux/reducer/times-reducer.js
 * @Description: Do not edit
 */
import { GET_TIMES } from '../action';

const timesReducer = (state = [], action) => {
    switch (action.type) {
        case GET_TIMES:
            return [...action.value];
        default:
            return state;
    }
};

export { timesReducer };
