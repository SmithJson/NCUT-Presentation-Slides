/*
 * @Author: zhangl
 * @Date: 2020-04-29 17:52:23
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-04 00:48:47
 * @FilePath: /react-cms-webpack/src/Common.js
 * @Description: Common 容器组件
 */
import React from 'react';
import { Row, Col } from 'antd';
import { Header, Footer } from './components';

export default class Admin extends React.Component {
    render() {
        const { props } = this;
        const { children } = props;
        return (
            <Row className="container">
                <Col span={24} className="main-wrapper">
                    <Header />
                    <Row className="content">{children}</Row>
                    <Footer />
                </Col>
            </Row>
        );
    }
}
