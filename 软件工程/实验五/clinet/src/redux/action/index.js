/*
 * @Author: zhangl
 * @Date: 2020-05-03 13:37:52
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-25 16:00:21
 * @FilePath: /clinet/src/redux/action/index.js
 * @Description: actions 管理
 */
const createAction = (data, type) => ({
    type,
    value: data,
});

// breadcrumb
const CHANGE_BREADCRUMB = 'change_breadcrumb';
const handleChangeBreadcrumb = data => (
    dispatch => dispatch(createAction(data, CHANGE_BREADCRUMB))
);

// router
const CHANGE_ROUTES_TOTAL = 'change_routes_total';
const CHANGE_ROUTES = 'change_routes';
const CHANGE_MENU = 'change_menu';

const handleChangeRoutesFlat = data => dispatch => (
    dispatch(createAction(data, CHANGE_ROUTES))
);
const handleChangeRoutesMenu = data => dispatch => (
    dispatch(createAction(data, CHANGE_MENU))
);

// school
const CHANGE_SCHOOL = 'change_school';

const handleChangeSchool = data => dispatch => (
    dispatch(createAction(data, CHANGE_SCHOOL))
);

// times
const GET_TIMES = 'change_times';

const handleGetTimes = data => dispatch => (
    dispatch(createAction(data, GET_TIMES))
);

export {
    createAction,
    CHANGE_BREADCRUMB,
    CHANGE_ROUTES_TOTAL,
    CHANGE_ROUTES,
    CHANGE_MENU,
    CHANGE_SCHOOL,
    GET_TIMES,
    handleGetTimes,
    handleChangeBreadcrumb,
    handleChangeRoutesFlat,
    handleChangeRoutesMenu,
    handleChangeSchool,
};
