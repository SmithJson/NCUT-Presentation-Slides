/*
 * @Author: zhangl
 * @Date: 2020-05-03 21:32:35
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-20 18:32:22
 * @FilePath: /clinet/src/config/menuConfig.js
 * @Description: Do not edit
 */
import React from 'react';
import {
    TeamOutlined,
    UserOutlined,
    TagsOutlined,
    TableOutlined,
    SettingOutlined,
    CreditCardOutlined,
} from '@ant-design/icons';
import Pages from '../pages';

const authRoutes = [
    {
        icon: <TeamOutlined />,
        component: Pages.StudentList,
        title: '学生管理',
        path: '/student',
        auth: true, // 登录访问
        permission: 'student_list.view', // 认证访问
        exact: true, // 严格匹配
        routes: [
            {
                component: Pages.StudentDetail,
                title: '详情',
                path: '/student/:id', // 当前路由
                dynamic: ({ id }) => `/student/${id}`, // 动态路由：随着参数的变化，而改变并将最终结果转化当前路由
                static: '/student/:id', // 静态路由
                auth: true,
                exact: true,
                permission: 'student.view',
            },
            {
                component: Pages.StudentDetail,
                title: '添加',
                path: '/:method/student',
                dynamic: ({ method }) => `/${method}/student`,
                static: '/:method/student',
                auth: true,
                exact: true,
                permission: 'student.add',
            },
            {
                component: Pages.StudentDetail,
                title: '编辑',
                path: '/:method/student/:id',
                dynamic: ({ method, id }) => `/${method}/student/${id}`,
                static: '/:method/student/:id',
                auth: true,
                exact: true,
                permission: 'student.edit',
            },
        ],
    },
    {
        icon: <UserOutlined />,
        title: '教师管理',
        path: '/teacher',
        component: Pages.TeacherList,
        auth: true,
        exact: true,
        permission: 'teacher_list.view',
        routes: [
            {
                component: Pages.TeacherDetail,
                title: '详情',
                path: '/teacher/:id',
                static: '/teacher/:id',
                dynamic: ({ id }) => `/teacher/${id}`,
                auth: true,
                exact: true,
                permission: 'teacher.view',
            },
            {
                component: Pages.TeacherDetail,
                title: '添加',
                path: '/:method/teacher',
                dynamic: ({ method }) => `/${method}/teacher`,
                static: '/:method/teacher',
                auth: true,
                exact: true,
                permission: 'teacher.add',
            },
            {
                component: Pages.TeacherDetail,
                title: '编辑',
                path: '/:method/teacher/:id',
                static: '/:method/teacher/:id',
                dynamic: ({ method, id }) => `/${method}/teacher/${id}`,
                auth: true,
                exact: true,
                permission: 'teacher.edit',
            },
        ],
    },
    {
        icon: <TagsOutlined />,
        component: Pages.CourseList,
        title: '课程管理',
        path: '/course',
        auth: true,
        exact: true,
        permission: 'course_list.view',
        routes: [
            {
                component: Pages.CourseDetail,
                title: '详情',
                path: '/course/:id',
                static: '/course/:id',
                dynamic: ({ id }) => `/course/${id}`,
                auth: true,
                exact: true,
                permission: 'course.view',
            },
            {
                component: Pages.CourseDetail,
                title: '添加',
                path: '/:method/course',
                dynamic: ({ method }) => `/${method}/course`,
                static: '/:method/course',
                auth: true,
                exact: true,
                permission: 'course.add',
            },
            {
                component: Pages.CourseDetail,
                title: '编辑',
                path: '/:method/course/:id',
                static: '/:method/course/:id',
                dynamic: ({ method, id }) => `/${method}/course/${id}`,
                auth: true,
                exact: true,
                permission: 'course.edit',
            },
        ],
    },
    {
        icon: <CreditCardOutlined />,
        component: Pages.TeachList,
        title: '授课管理',
        path: '/teach',
        auth: true,
        exact: true,
        permission: 'teach_list.view',
        routes: [
            {
                component: Pages.TeachDetail,
                title: '详情',
                path: '/teach/:id',
                static: '/teach/:id',
                dynamic: ({ id }) => `/teach/${id}`,
                auth: true,
                exact: true,
                permission: 'teach.view',
            },
            {
                component: Pages.TeachDetail,
                title: '添加',
                path: '/:method/teach',
                dynamic: ({ method }) => `/${method}/teach`,
                static: '/:method/teach',
                auth: true,
                exact: true,
                permission: 'teach.add',
            },
            {
                component: Pages.TeachDetail,
                title: '编辑',
                path: '/:method/teach/:id',
                static: '/:method/teach/:id',
                dynamic: ({ method, id }) => `/${method}/teach/${id}`,
                auth: true,
                exact: true,
                permission: 'teach.edit',
            },
        ],
    },
    {
        icon: <TableOutlined />,
        component: Pages.ElectiveList,
        title: '选课管理',
        path: '/elective',
        auth: true,
        exact: true,
        permission: 'elective_list.view',
        routes: [
            {
                component: Pages.ElectiveDefault,
                title: '详情',
                path: '/elective/:id',
                static: '/elective/:id',
                dynamic: ({ id }) => `/elective/${id}`,
                auth: true,
                exact: true,
                permission: 'elective.view',
            },
            {
                component: Pages.ElectiveDefault,
                title: '添加',
                path: '/:method/elective',
                dynamic: ({ method }) => `/${method}/elective`,
                static: '/:method/elective',
                auth: true,
                exact: true,
                permission: 'elective.add',
            },
            {
                component: Pages.ElectiveDefault,
                title: '编辑',
                path: '/:method/elective/:id',
                static: '/:method/elective/:id',
                dynamic: ({ method, id }) => `/${method}/elective/${id}`,
                auth: true,
                exact: true,
                permission: 'elective.edit',
            },
        ],
    },
    {
        icon: <SettingOutlined />,
        component: Pages.Profile,
        title: '个人信息',
        path: '/profile',
        auth: true,
        exact: true,
        hidden: true,
        permission: 'profile.view',
    },
];

const nonAuthRoutes = [
    {
        component: Pages.Login,
        title: '登录',
        path: '/login',
        exact: true,
    },
    {
        component: Pages.Error,
        title: '403',
        path: '/403',
        exact: true,
    },
    {
        component: Pages.Error,
        title: '404',
        path: '/404',
        exact: true,
    },
    {
        component: Pages.Error,
        title: '500',
        path: '/500',
        exact: true,
    },
];

export {
    authRoutes,
    nonAuthRoutes,
};
