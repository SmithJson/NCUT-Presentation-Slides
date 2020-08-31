/*
 * @Author: zhangl
 * @Date: 2020-05-31 20:07:36
 * @LastEditors: zhangl
 * @LastEditTime: 2020-06-01 20:29:37
 * @FilePath: /client/src/pages/Login.js
 * @Description: Do not edit
 */
import React, { Component } from 'react';
import { Avatar, Input, Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import http from '../tools/http';
import './login.css';

export default class Login extends Component {
    state = {
        username: '',
        avatar: '',
        imgs: [
            "/avatar1.jpeg",
            "/avatar2.jpeg",
            "/avatar3.jpeg",
            "/avatar4.jpeg",
            "/avatar5.jpeg",
            "/avatar6.jpeg",
            "/avatar7.jpeg",
            "/avatar8.jpeg",
            "/avatar9.jpeg",
        ],
    }

    handleChangeAvatar = item => {
        this.setState({
            avatar: item,
        });
    }

    handleChangeUsername = e => {
        this.setState({
            username: e.target.value,
        });
    }

    handleFetchConnect = () => {
        const { username, avatar } = this.state
        const user = { username, avatar };
        http.post('/connect', user).then(res => {
            const { data } = res;
            if (data.code === -1) {
                message.error(data.result);
                return;
            }
            sessionStorage.setItem('SOCKET_CONFIG', JSON.stringify(data.result));
            sessionStorage.setItem('USER', JSON.stringify(user));
            this.props.history.push('/chat');
        });
    }

    render() {
        return (
            <div className="login-container">

                <div className="form-wrap">
                    <div className="username-wrap">
                        <Input
                            value={this.state.username}
                            placeholder="请输入聊天昵称"
                            onChange={this.handleChangeUsername}
                        />
                    </div>
                    <div className="avatar" style={{ marginBottom: 20 }}>
                        <Avatar
                            size={64}
                            src={this.state.avatar}
                            icon={<UserOutlined />}
                        />
                    </div>
                    <div className="avatar-list">
                        {this.state.imgs.map((item, index) => (
                            <Avatar
                                size={64}
                                src={item}
                                icon={<UserOutlined />}
                                key={index}
                                style={{ cursor: "pointer" }}
                                onClick={() => this.handleChangeAvatar(item)}
                            />
                        ))}
                    </div>
                    <Button onClick={this.handleFetchConnect}>进入聊天室</Button>
                </div>
            </div>
        );
    }
}
