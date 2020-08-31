/*
 * @Author: zhangl
 * @Date: 2020-04-29 17:52:23
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-05 12:46:11
 * @FilePath: /react-cms-webpack/src/Admin.js
 * @Description: Admin 容器组件
 */
import React from 'react';
import { Row, Col } from 'antd';
import { NavLeft, Header, Footer } from './components';

export default class Admin extends React.Component {
    render() {
        const { props } = this;
        const { children } = props;
        return (
            <Row className="container">
                <Col span={4} className="nav-left-wrapper">
                    <NavLeft />
                </Col>
                <Col span={20} className="main-wrapper">
                    <Header />
                    <Row className="content">{children}</Row>
                    <Footer />
                </Col>
            </Row>
        );
    }
}
