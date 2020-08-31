/*
 * @Author: zhangl
 * @Date: 2020-05-16 11:56:54
 * @LastEditors: zhangl
 * @LastEditTime: 2020-06-05 14:20:36
 * @FilePath: /clinet/src/pages/student/detail/index.js
 * @Description: 学生详情
 */
import React, { Component } from 'react';
import {
    Form,
    Button,
    Input,
    InputNumber,
    Tag,
    message,
    Radio,
    Select,
} from 'antd';
import { connect } from 'react-redux';
import {
    fetchStudent,
    updateStudent,
    // fetchSchool,
    fetchDept,
} from '../../../api';
import { REGEXP, GENDER, REGISTERED } from '../../../config';
import { WithBreadcrumb, MyImgUpload } from '../../../components';

const { Option } = Select;

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
        const { params } = this.props.match;
        if (!params.id) return;
        this.fetchStudent();
    }

    fetchStudent = () => {
        const { params } = this.props.match;
        fetchStudent({ id: params.id, noLoading: true }).then(res => {
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

    updateStudent = values => {
        updateStudent(values).then(() => {
            if (!values.id) {
                message.success('添加成功');
            } else {
                message.success('编辑成功');
            }
        });
    }

    handleSubmit = values => {
        const { params } = this.props.match;
        const newValues = { id: params.id, params: values };
        this.updateStudent(newValues);
    }

    // 学院改变事件：修改学院后，清空专业
    onSchoolChange = () => {
        this.mForm.setFieldsValue({
            deptId: undefined,
        });
        this.setState({
            dept: [],
        });
        const schoolId = this.mForm.getFieldValue('schoolId');
        if (!schoolId) return;
        this.fetchSchoolDept(schoolId);
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
        const validateMessages = {
            required: '请填写${label}',
            types: {
                email: '${label}格式不正确',
                number: '${label}格式不正确!',
            },
            number: {
                range: '${label}区间 ${min} - ${max}岁',
            },
        };
        const { params } = this.props.match;
        const isAddFlag = params.method === 'add' && !params.id;
        const isEditFlag = params.method === 'edit' && params.id;
        return (
            <div className="student-detail-container content-wrap">
                <Form
                    {...layout}
                    ref={form => { this.mForm = form; }}
                    name="post-form"
                    onFinish={this.handleSubmit}
                    validateMessages={validateMessages}
                    hideRequiredMark={true}
                    scrollToFirstError
                    initialValues={this.state}
                >
                    <Form.Item
                        name="no"
                        label="学号"
                        rules={[
                            { required: true },
                        ]}
                    >
                        {isAddFlag ? <Input placeholder="请输入学号" />
                            : <div><Tag color="red">{this.state.role}</Tag>{this.state.no}</div>}
                    </Form.Item>
                    <Form.Item
                        name="username"
                        label="姓名"
                        rules={[
                            { required: true },
                        ]}
                    >
                        {isAddFlag ? <Input placeholder="请输入姓名" /> : <div>{this.state.username}</div>}
                    </Form.Item>
                    <Form.Item
                        name="tel"
                        label="手机"
                        rules={[
                            () => ({
                                validator(rule, value) {
                                    // eslint-disable-next-line prefer-promise-reject-errors
                                    if (!value) return Promise.reject('请填写手机号');
                                    // eslint-disable-next-line prefer-promise-reject-errors
                                    if (!REGEXP.phone.test(value)) return Promise.reject('手机号码格式不正确');
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                    >
                        {isEditFlag || isAddFlag ? <Input placeholder="请输入手机" /> : <div>{this.state.tel}</div>}
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="邮箱"
                        rules={[
                            { type: 'email' },
                        ]}
                    >
                        {isEditFlag || isAddFlag ? <Input placeholder="请输入邮箱" /> : <div>{this.state.email}</div>}
                    </Form.Item>
                    <Form.Item name="gender" label="性别">
                        {isEditFlag || isAddFlag ? (
                            <Radio.Group>
                                {Object.keys(GENDER).map(key => <Radio value={key}>{GENDER[key]}</Radio>)}
                            </Radio.Group>
                        ) : <div>{GENDER[this.state.gender]}</div>}
                    </Form.Item>
                    <Form.Item
                        name="age"
                        label="年龄"
                        rules={[
                            {
                                type: 'number',
                                min: 0,
                                max: 200,
                            },
                        ]}
                    >
                        {isEditFlag || isAddFlag ? <InputNumber placeholder="年龄" />
                            : <div>{this.state.age || 0} 岁</div>}
                    </Form.Item>
                    <Form.Item
                        name="schoolId"
                        label="所属院校"
                        rules={[
                            { required: true },
                        ]}
                    >
                        {isEditFlag || isAddFlag ? (
                            <Select
                                allowClear
                                onChange={this.onSchoolChange}
                                placeholder="请选择所属院校"
                            >
                                {this.props.school.map(item => (
                                    <Option key={item.id} value={item.id}>{item.value}</Option>
                                ))}
                            </Select>
                        )
                            : <div>
                                {(this.props.school.find(item => item.id === this.state.schoolId) || {}).value}
                            </div>}
                    </Form.Item>
                    <Form.Item
                        name="deptId"
                        label="所属专业"
                        rules={[
                            { required: true },
                        ]}
                    >
                        {isEditFlag || isAddFlag ? (
                            <Select
                                placeholder="请选择所属专业"
                                allowClear
                            >
                                {this.state.dept.map(item => (
                                    <Option key={item.id} value={item.id}>{item.value}</Option>
                                ))}
                            </Select>
                        )
                            : <div>
                                {(this.state.dept.find(item => item.id === this.state.deptId) || {}).value}
                            </div>}
                    </Form.Item>
                    <Form.Item name="avatar" label="头像">
                        {isEditFlag || isAddFlag ? (
                            <MyImgUpload />
                        ) : <img src={this.state.avatar} style={{ maxWidth: '200px' }} />}
                    </Form.Item>
                    <Form.Item name="registered" label="注册">
                        {isEditFlag || isAddFlag ? (
                            <Radio.Group>
                                {Object.keys(REGISTERED).map(key => <Radio value={key}>{REGISTERED[key]}</Radio>)}
                            </Radio.Group>
                        ) : <div>{REGISTERED[this.state.registered]}</div>}
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        {(isEditFlag || isAddFlag) && <Button type="primary" htmlType="submit">提交</Button>}
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
