/*
 * @Author: zhangl
 * @Date: 2020-05-05 21:08:50
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-09 23:23:26
 * @FilePath: /react-cms-webpack/src/components/Breadcrumb/index.js
 * @Description: 面包屑组件
 */
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

@connect(
    state => ({
        breadcrumb: state.breadcrumb,
    }),
)
export default class Breadcrumb extends Component {
    createBreadcrumb = () => {
        const { breadcrumb } = this.props;
        const lastRoute = breadcrumb[breadcrumb.length - 1];
        return breadcrumb.map(item => {
            if (!item.component) return;
            if (item === lastRoute) return <span>{item.title}</span>;
            return (
                <Fragment>
                    <Link to={item.path}>{item.title}</Link>&nbsp;/&nbsp;
                </Fragment>
            );
        });
    }

    render() {
        return (
            <div>{this.createBreadcrumb()}</div>
        );
    }
}
