/*
 * @Author: zhangl
 * @Date: 2020-05-15 11:03:43
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-15 16:00:13
 * @FilePath: /clinet/src/components/antd/Table/index.js
 * @Description: antd 表格
 */
import React, { Component, Fragment } from 'react';
import { Table } from 'antd';

export default class MyTable extends Component {
    render() {
        const newProps = {
            ...this.props,
            scroll: { x: 800, y: 500 },
            dataSource: this.props.data,
            columns: this.props.columns,
            bordered: true,
        };
        if (this.props.pagination) newProps.pagination = this.props.pagination;
        return (
            <Fragment>
                <Table { ...newProps } />
            </Fragment>
        );
    }
}
