/*
 * @Author: zhangl
 * @Date: 2020-05-31 22:37:37
 * @LastEditors: zhangl
 * @LastEditTime: 2020-06-01 19:16:51
 * @FilePath: /client/src/pages/ChatRoom.js
 * @Description: Do not edit
 */
import React, { Component } from 'react';
import { Avatar, Input, Badge, Drawer } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import io from 'socket.io-client';
import moment from 'moment';
import './chat-room.css';

export default class Login extends Component {
    socket = null;

    state = {
        member: 0, // 当前在线人数
        username: '',
        content: '', // 要发送的内容
        userList: [],
        chat: [],
        o2oChat: [],
        visible: false,
        name: '',
        fid: '',
        uid: '',
    }

    static getDerivedStateFromProps = (nextProps, nextState) => {
        if (!this.socket) {
            if (!sessionStorage.getItem('SOCKET_CONFIG')) return null;
            const config = JSON.parse(sessionStorage.getItem('SOCKET_CONFIG'));
            const socket = io(`http://${config.ip}:${config.port}`);
            this.socket = socket;
        }
        return null;
    }

    componentDidMount() {
        this.handleJoinChat();
        this.handleQuitChat();
        this.getSendMessage();
        this.getSendO2OMessage();
    }

    componentWillUnmount() {
        // sessionStorage.removeItem('SOCKET_CONFIG');
        // sessionStorage.removeItem('USER');
    }

    goBack = () => {
        this.props.history.push('/login');
    }

    renderChatList = () => {
        const { chat } = this.state;
        return chat.map((item, index) => {
            switch(item.id) {
                case 1: // 自己信息
                    return (
                        <div className="info mine" key={index}>
                            <div className="info-l">
                                <div className="text">{item.msg}</div>
                                <div className="date" style={{color: "#999"}}>{moment(item.time).format('HH:mm')}</div>
                            </div>
                            <div className="info-r">
                                <img className="avatar" src={item.avatar} alt="" />
                            </div>
                        </div>
                    );
                case 2: // 他人信息
                    return (
                        <div className="info other" key={index}>
                            <div className="info-l">
                                <img className="avatar" src={item.avatar} alt="" />
                            </div>
                            <div className="info-r">
                                <div className="text">{item.msg}</div>
                                <div className="time-wrapper" style={{ display: "flex", color: "#999" }}>
                                    <div className="username" style={{marginRight: 5}}>{item.username}</div>
                                    <div className="date">{moment(item.time).format('HH:mm')}</div>
                                </div>
                            </div>
                        </div>
                    );
                case 3: // 系统信息
                    return (
                        <div className="info sys" key={index}>
                            <div className="text">{item.msg}</div>
                        </div>
                    );
                default:
                    return null;
            }
        });
    }

    renderO2OChatList = () => {
        const { o2oChat, fid, uid } = this.state;
        return o2oChat.map((item, index) => {
            if (item.fid === uid) {
                return (
                    <div className="info mine" key={index}>
                        <div className="info-l">
                            <div className="text">{item.msg}</div>
                            <div className="date" style={{ color: "#999" }}>{moment(item.time).format('HH:mm')}</div>
                        </div>
                        <div className="info-r">
                            <img className="avatar" src={item.avatar} alt="" />
                        </div>
                    </div>
                );
            }
            if (item.fid === fid) {
                return (
                    <div className="info other" key={index}>
                        <div className="info-l">
                            <img className="avatar" src={item.avatar} alt="" />
                        </div>
                        <div className="info-r">
                            <div className="text">{item.msg}</div>
                            <div className="time-wrapper" style={{ display: "flex", color: "#999" }}>
                                <div className="username" style={{ marginRight: 5 }}>{item.username}</div>
                                <div className="date">{moment(item.time).format('HH:mm')}</div>
                            </div>
                        </div>
                    </div>
                );
            }
            return null;
        });
    }

    handleSendMessage = () => {
        const { socket } = Login;
        const { content, chat } = this.state
        const user = JSON.parse(sessionStorage.getItem("USER"));
        let data = {
            avatar: user.avatar,
            msg: content,
            id: 1,
            time: Date.now(),
        };
        let sendData = {
            ...data,
            id: 2,
            username: user.username,
        }
        chat.push(data);
        this.setState({
            chat,
            content: '',
        });
        socket.emit('message', sendData);
    }

    handleSendO2OMessage = () => {
        const { socket } = Login;
        const { content, o2oChat } = this.state
        const user = JSON.parse(sessionStorage.getItem("USER"));
        let data = {
            avatar: user.avatar,
            msg: content,
            fid: this.state.uid,
            time: Date.now(),
        };
        console.log(this.state.uid, this.state.fid);
        let sendData = {
            ...data,
            fid: this.state.uid,
            tid: this.state.fid,
            username: user.username,
        }
        o2oChat.push(data);
        this.setState({
            o2oChat,
            content: '',
        });
        socket.emit('o2oMsg', sendData);
    }

    getSendMessage = () => {
        const { socket } = Login;
        const { chat } = this.state
        socket.on('gdMsg', data => {
            chat.push(data);
            this.setState({
                chat,
            });
        });
    }

    getSendO2OMessage = () => {
        const { socket } = Login;
        const { o2oChat } = this.state
        socket.on('o2oGdMsg', data => {
            o2oChat.push(data);
            this.setState({
                o2oChat,
            }, () => console.log(this.state.o2oChat));
        });
    }

    handleJoinChat = () => {
        const { socket } = Login;
        socket.on('welcome', (username, member, userList) => {
            const data = {
                msg: `欢迎 ${username} 加入群聊`,
                id: 3
            };
            const { chat } = this.state;
            chat.push(data);
            this.setState({
                userList: userList.filter(item => item.id !== this.state.uid),
                chat,
                member,
            });
        });

        socket.on('myself', (username, member, userList, uid) => {
            const data = {
                msg: `欢迎 ${username} 加入群聊`,
                id: 3
            };
            const { chat } = this.state;
            chat.push(data);
            this.setState({
                uid,
                userList: userList.filter(item => item.id !== uid),
                member,
                chat,
            })
        });
        const user = JSON.parse(sessionStorage.getItem("USER"));
        this.setState({
            username: user.username
        }, () => socket.emit('join', user.username, user.avatar));
    }

    handleQuitChat = () => {
        const { socket } = Login;
        socket.on('quit', (username, member, userList) => {
            const data = {
                msg: `${username} 离开群聊`,
                id: 3
            };
            const { chat } = this.state;
            chat.push(data);
            this.setState({
                chat,
                member,
                userList,
            });
        });
    }

    handleChangeChat = e => {
        const { value } = e.target;
        this.setState({
            content: value,
        });
    }

    handleO2oChat = value => {
        const list = this.state.userList;
        const newList = list.map(item => {
            if (value === item) {
                item.tip = false;
            }
            return item;
        });
        this.setState({
            userList: newList,
            visible: !this.state.visible,
            name: value.username,
            fid: value.id,
        });
    }

    handleCloseO2O = () => {
        this.setState({
            visible: false,
            name: '',
            fId: '',
        })
    }

    render() {
        return (
            <div className="chat-room-container">
                <div className="header">
                    <img src="/left-icon.svg" alt="返回" className="back-btn" onClick={this.goBack} />
                    <h1 className="title">{`${this.state.username || 'XXX'}的聊天室`}</h1>
                    <h2 className="online">{`在线 ${this.state.member} 人`}</h2>
                </div>
                <div className="user-list-wrapper">
                    <div className="user-list">
                        {this.state.userList.map(item => (
                            <Badge dot={item.tip} key={item.id} onClick={() => this.handleO2oChat(item)}>
                                <Avatar
                                    shape="square"
                                    style={{ margin: '0 4px', borderRadius: 5 }}
                                    icon={<UserOutlined />}
                                    src={item.avatar}
                                />
                            </Badge>
                        ))}
                    </div>
                </div>
                <div className="main">
                    <div className="message-wrapper">
                        <div className="chat-list">
                            <div className="msg">
                                {!this.state.visible ? this.renderChatList() : (
                                    <Drawer
                                        title={this.state.name}
                                        placement="bottom"
                                        closable={false}
                                        onClose={this.handleCloseO2O}
                                        visible={this.state.visible}
                                        getContainer={false}
                                        style={{ position: "absolute" }}
                                        height="80vh"
                                    >
                                        <div className="o2o-msg">{this.renderO2OChatList()}</div>
                                        <div className="send-wrapper">
                                            <Input
                                                onChange={this.handleChangeChat}
                                                value={this.state.content}
                                                addonAfter={
                                                    <img
                                                        onClick={this.handleSendO2OMessage}
                                                        alt="发送"
                                                        src="/send-btn.svg"
                                                        className="send-btn"
                                                    />
                                                }
                                                allowClear
                                            />
                                        </div>
                                    </Drawer>
                                )}
                            </div>
                        </div>
                        <div className="send-wrapper">
                            <Input
                                onChange={this.handleChangeChat}
                                value={this.state.content}
                                addonAfter={
                                    <img
                                        onClick={this.handleSendMessage}
                                        alt="发送"
                                        src="/send-btn.svg"
                                        className="send-btn"
                                    />
                                }
                                allowClear
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}