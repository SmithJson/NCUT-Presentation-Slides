/*
 * @Author: zhangl
 * @Date: 2020-05-14 15:59:19
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-26 22:54:48
 * @FilePath: /clinet/src/pages/profile/index.js
 * @Description: 个人简介
 */

import React, { Component } from 'react';
import {
    Form,
    Tag,
} from 'antd';
import { connect } from 'react-redux';
import { fetchProfile, fetchDept } from '../../api';
import { GENDER } from '../../config';
import { getItem } from '../../tools';
import { WithBreadcrumb } from '../../components';

@WithBreadcrumb()
@connect(
    state => ({ ...state }),
)
export default class Detail extends Component {
    state = {
        gender: 'unknown',
        dept: [],
    }

    componentDidMount() {
        this.fetchProfile();
    }

    fetchProfile = () => {
        const user = JSON.parse(getItem('USER_INFO') || '{}');
        if (!user.no) return;
        fetchProfile({ id: user.no }).then(res => {
            this.fetchSchoolDept(res.schoolId);
            this.mForm.setFieldsValue({ ...res });
            this.setState({ ...res });
        });
    }

    fetchSchoolDept = id => {
        fetchDept(id).then(res => {
            this.setState({
                dept: res,
            });
        });
    }

    render() {
        const layout = {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 16,
            },
        };
        return (
            <div className="profile-detail-container content-wrap">
                <Form
                    {...layout}
                    ref={form => { this.mForm = form; }}
                    name="post-form"
                    hideRequiredMark={true}
                    initialValues={this.state}
                >
                    <Form.Item
                        name="no"
                        label={this.state.role === '学生' ? '学号' : '工号'}
                    >
                        <div><Tag color="red">{this.state.role}</Tag>{this.state.no}</div>
                    </Form.Item>
                    <Form.Item
                        name="username"
                        label="姓名"
                    >
                        <div>{this.state.username}</div>
                    </Form.Item>
                    <Form.Item
                        name="tel"
                        label="手机"
                    >
                        <div>{this.state.tel}</div>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="邮箱"
                    >
                        <div>{this.state.email}</div>
                    </Form.Item>
                    <Form.Item name="gender" label="性别">
                        <div>{GENDER[this.state.gender]}</div>
                    </Form.Item>
                    <Form.Item
                        name="age"
                        label="年龄"
                    >
                        <div>{this.state.age || 0} 岁</div>
                    </Form.Item>
                    <Form.Item
                        name="schoolId"
                        label="所属院校"
                    >
                        <div>
                            {(this.props.school.find(item => item.id === this.state.schoolId) || {}).value}
                        </div>
                    </Form.Item>
                    <Form.Item
                        name="deptId"
                        label="所属专业"
                    >
                        <div>
                            {(this.state.dept.find(item => item.id === this.state.deptId) || {}).value}
                        </div>
                    </Form.Item>
                    <Form.Item name="avatar" label="头像">
                        <img src={this.state.avatar} alt={'avatar'} style={{ maxWidth: 300 }} />
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
