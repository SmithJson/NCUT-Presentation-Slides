/*
 * @Author: zhangl
 * @Date: 2020-06-01 19:25:17
 * @LastEditors: zhangl
 * @LastEditTime: 2020-06-01 20:38:16
 * @FilePath: /client/src/pages/Server.js
 * @Description: Do not edit
 */
import React, { Component } from 'react';
import { Button, Input, message } from 'antd';
import moment from 'moment';
import io from 'socket.io-client'
import http from '../tools/http';

const { TextArea } = Input;

export default class Server extends Component {
    state = {
        value: '',
        ip: '',
        port: '',
        socket: null,
    }

    componentDidMount() {
        this.fetchIp();
    }

    fetchIp = () => {
        http.get('/ip').then(res => {
            const { data } = res;
            if (data.code === -1) {
                message.error(data.result);
                return;
            }
            this.setState({
                ip: data.result,
            })
        })
    }

    handleClearAll = () => {
        this.setState({
            value: ''
        });
    }

    handleChangeIpt = (e, type) => {
        const { value } = e.target;
        this.setState({
            [type]: value
        });
    }

    handleStart = () => {
        const { ip, port } = this.state;
        http.get('/start', { ip, port }).then(res => {
            const { data } = res;
            if (data.code === -1) {
                message.error("启动失败");
                return;
            }
            message.success(data.result);
            if (!this.state.socket) {
                const socket = io(`http://${this.state.ip}:${this.state.port}`);
                this.setState({
                    socket,
                });
                socket.on('all', data => {
                    let value = '';
                    console.log(data);
                    data.forEach(item => {
                        value += `${item.username} 说：${item.msg} ${moment(item.time).format('YY MM DD HH:mm')} \n`;
                    });
                    this.setState({
                        value,
                    });
                });
            }
        });
    }

    render() {
        return (
            <div className="server-container">
                <div className="preview-wrapper">
                    <TextArea rows={25} disabled value={this.state.value} style={{ color: 'black' }} />
                </div>
                <div className="btn-group" style={{marginTop: 20, textAlign: 'right'}}>
                    <Input
                        placeholder="请输入ip"
                        style={{ width: 300 }}
                        value={this.state.ip}
                        onChange={e => this.handleChangeIpt(e, 'ip')}
                    />
                    <Input
                        placeholder="请输入端口"
                        style={{ width: 100 }}
                        value={this.state.port}
                        onChange={e => this.handleChangeIpt(e, 'port')}
                    />
                    <Button onClick={this.handleStart}>启动</Button>
                    <Button>停止</Button>
                    <Button onClick={this.handleClearAll}>清除所有</Button>
                </div>
            </div>
        );
    }
}
