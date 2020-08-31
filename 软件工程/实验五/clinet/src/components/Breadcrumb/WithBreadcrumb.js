/*
 * @Author: zhangl
 * @Date: 2020-05-15 22:45:43
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-19 23:55:50
 * @FilePath: /clinet/src/components/Breadcrumb/WithBreadcrumb.js
 * @Description: 获取当前节点到到根节点的的路径数组
 */
import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { handleChangeBreadcrumb } from '../../redux/action';

const withDescription = data => WrappedComponent => {
    @connect(
        state => ({ ...state }),
        { handleChangeBreadcrumb },
    )
    class WithBreadcrumb extends Component {
        componentDidMount() {
            this.init();
        }

        init = () => {
            const { location, match } = this.props;
            const breadcrumb = this.getBreadcrumb(location.pathname, match.params);
            this.props.handleChangeBreadcrumb(breadcrumb);
        }

        getBreadcrumb = (pathname, params = {}, arr = []) => {
            let route = this.props.routesFlat.find(item => {
                if (item.dynamic) return item.dynamic(params) === pathname;
                return item.path === pathname;
            });
            if (!route) return arr;
            // 生成动态路由，用于面包屑返回
            if (route.dynamic) route = { ...route, path: route.dynamic(params) };
            arr.unshift(route);
            // 顶级路由
            if (route.pid === 0) return arr;
            // 子路由
            let parentRoute = this.props.routesFlat.find(item => item.id === route.pid);
            if (parentRoute.dynamic) parentRoute = { ...parentRoute, path: parentRoute.dynamic(params) };
            return this.getBreadcrumb(parentRoute.path, params, arr);
        }

        render() {
            const newProps = !data ? this.props : { ...data, ...this.props };
            return (
                <Fragment>
                    <WrappedComponent {...newProps} />
                </Fragment>
            );
        }
    }
    return WithBreadcrumb;
};

export default withDescription;
