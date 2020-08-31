/*
 * @Author: zhangl
 * @Date: 2020-04-29 21:16:23
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-27 10:43:17
 * @FilePath: /clinet/src/pages/common/login/index.js
 * @Description: 登录/注册页
 */
import React, { Component } from 'react';
import {
    Form,
    Input,
    Checkbox,
    Button,
} from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAuth } from '../../../api';
import './index.less';

const getItem = localStorage.getItem.bind(localStorage);
const setItem = localStorage.setItem.bind(localStorage);

@connect(
    state => ({ ...state }),
)
export default class Login extends Component {
    state = {
        password: '',
        username: '',
        tel: '',
        remember: false,
        nickname: '',
    }

    componentDidMount() {
        this.init();
    }

    init = () => {
        if (!getItem('LOGIN_PAGE_CACHE')) setItem('LOGIN_PAGE_CACHE', '{}');
        const state = JSON.parse(getItem('LOGIN_PAGE_CACHE'));
        this.setState({ ...this.state, ...state }, () => this.handleSWitchPage('init'));
    }

    handleSubmit = values => {
        fetchAuth({ ...values }).then(data => {
            this.setState({ ...values }, () => {
                setItem('LOGIN_PAGE_CACHE', JSON.stringify(this.state));
                setItem('USER_INFO', JSON.stringify(data));
                this.props.history.push('/');
            });
        });
    }

    // 页面切换，更新 Form initial value
    handleSWitchPage = init => {
        const loginPage = /login/g.test(this.props.location.pathname);
        this.mForm.resetFields(Object.keys(this.state));
        const partState = {};
        if (init === 'init') {
            partState.password = this.state.remember && loginPage ? this.state.password : '';
            partState.username = this.state.remember && loginPage ? this.state.username : '';
        } else if (loginPage) {
            partState.password = '';
            partState.username = '';
        } else {
            partState.password = this.state.remember ? this.state.password : '';
            partState.username = this.state.remember ? this.state.username : '';
        }
        this.mForm.setFieldsValue({
            ...partState,
            tel: '',
            nickname: '',
        });
    }

    render() {
        const loginPage = /login/g.test(this.props.location.pathname);
        return (
            <div className="login-container">
                <div className="login-form">
                    <Form
                        ref={form => { this.mForm = form; }}
                        initialValues={{ ...this.state }}
                        onFinish={this.handleSubmit}
                    >
                        {loginPage ? (
                            <Form.Item name="username" rules={[
                                {
                                    required: true,
                                    message: '请输入教工号/学号',
                                },
                            ]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="教工号/学号" allowClear />
                            </Form.Item>
                        ) : (
                            <Form.Item name="nickname" rules={[
                                {
                                    required: true,
                                    message: '请输入昵称',
                                },
                            ]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="昵称" allowClear />
                            </Form.Item>
                        )}
                        <Form.Item name="password" rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                        ]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="密码" allowClear />
                        </Form.Item>
                        {loginPage ? (
                            <Form.Item className="forgot-wrapper">
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>记住我</Checkbox>
                                </Form.Item>
                                {/* <a className="forgot" href="#/home">忘记密码</a> */}
                            </Form.Item>
                        ) : (
                            <Form.Item name="tel" rules={[
                                {
                                    required: true,
                                    message: '请输入手机号',
                                },
                            ]}
                            >
                                <Input prefix={<PhoneOutlined />} placeholder="手机号" allowClear />
                            </Form.Item>
                        )}
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="submit-button"
                            >
                                {loginPage ? '登录' : '注册'}
                            </Button>
                            {/* <div className="register-wrapper">
                                {loginPage ? <Link to="/register" onClick={this.handleSWitchPage}>注册</Link>
                                    : <Link to="/login" onClick={this.handleSWitchPage}>已有账号？立即登录</Link>}
                            </div> */}
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}
