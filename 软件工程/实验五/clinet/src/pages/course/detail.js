/* eslint-disable no-restricted-syntax */
/*
 * @Author: zhangl
 * @Date: 2020-05-19 12:13:14
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-27 00:32:46
 * @FilePath: /clinet/src/pages/course/detail.js
 * @Description: 课程管理
 */
import React, { Component } from 'react';
import {
    Form,
    Button,
    Input,
    InputNumber,
    message,
    Select,
} from 'antd';
import { connect } from 'react-redux';
import { fetchCourse, updateCourse, fetchCourseList } from '../../api';
import { WithBreadcrumb } from '../../components';

const { Option } = Select;

@WithBreadcrumb()
@connect(
    state => ({ ...state }),
)
export default class Detail extends Component {
    state = {
        prevId: [],
        prev: [],
        addPrev: [],
    }

    componentDidMount() {
        const { params } = this.props.match;
        if (!params.id) return;
        this.fetchStudent();
    }

    fetchStudent = () => {
        const { params } = this.props.match;
        fetchCourse(params).then(res => {
            const prevId = (res.prev || []).map(item => item.id);
            this.setState({ ...res, prevId });
            this.mForm.setFieldsValue({ ...res, prevId });
        });
    }


    updateStudent = values => {
        updateCourse(values).then(() => {
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

    handleSearch = value => {
        clearTimeout(this.id);
        this.id = setTimeout(() => {
            if (value) {
                fetchCourseList({ scene: 'all', search: value, noLoading: true }).then(res => {
                    this.setState({ addPrev: res });
                });
            }
        }, 1000);
    };

    handleChange = values => {
        const prevArr = ([...this.state.prev, ...this.state.addPrev] || []).filter(item => {
            const index = values.indexOf(item.id);
            if (index !== -1) {
                return true;
            }
            return false;
        });
        this.setState({
            prev: prevArr,
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
        const validateMessages = {
            required: '请填写${label}',
            types: {
                number: '${label}格式不正确!',
            },
            number: {
                range: '${label}区间 ${min} - ${max}',
            },
        };
        const { params } = this.props.match;
        const isAddFlag = params.method === 'add' && !params.id;
        const isEditFlag = params.method === 'edit' && params.id;
        let prevArr = ([...this.state.prev, ...this.state.addPrev] || []);
        const prevIds = [...new Set(prevArr.map(item => item.id))];
        prevArr = prevArr.filter(item => {
            const index = prevIds.indexOf(item.id);
            if (index !== -1) {
                prevIds.splice(index, 1);
                return true;
            }
            return false;
        });
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
                        name="id"
                        label="课程号"
                        rules={[
                            { required: true },
                        ]}
                    >
                        {isEditFlag || isAddFlag ? <Input placeholder="请输入课程号" />
                            : <div>{this.state.id}</div>}
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="课程名"
                        rules={[
                            { required: true },
                        ]}
                    >
                        {isEditFlag || isAddFlag ? <Input placeholder="请输入课程名" /> : <div>{this.state.name}</div>}
                    </Form.Item>
                    <Form.Item
                        name="cycle"
                        label="学时"
                        rules={[
                            { required: true },
                            {
                                type: 'number',
                                min: 0,
                                max: 16,
                            },
                        ]}
                    >
                        {isEditFlag || isAddFlag ? <InputNumber placeholder="学时" />
                            : <div>{this.state.cycle || 0} 学时</div>}
                    </Form.Item>
                    <Form.Item
                        name="credit"
                        label="学分"
                        rules={[
                            { required: true },
                            {
                                type: 'number',
                                min: 0,
                                max: 5,
                            },
                        ]}
                    >
                        {isEditFlag || isAddFlag ? <InputNumber placeholder="学分" />
                            : <div>{this.state.credit || 0} 学分</div>}
                    </Form.Item>
                    <Form.Item
                        name="prevId"
                        label="先修课"
                    >
                        {isEditFlag || isAddFlag ? (
                            <Select
                                mode="multiple"
                                showSearch
                                defaultActiveFirstOption={false}
                                showArrow={false}
                                filterOption={false}
                                onSearch={this.handleSearch}
                                onChange={this.handleChange}
                                notFoundContent={null}
                                placeholder="请选择先修课"
                            >
                                {prevArr.map(
                                    item => <Option key={item.id} value={item.id}>{item.value}</Option>,
                                )}
                            </Select>
                        )
                            : <div>{(this.state.prev || []).map(item => item.value).join('、')}</div>}
                    </Form.Item>
                    <Form.Item
                        name="schoolId"
                        label="院校"
                        rules={[
                            { required: true },
                        ]}
                    >
                        {isEditFlag || isAddFlag ? (
                            <Select
                                allowClear
                                placeholder="请选择院校"
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
                        name="intro"
                        label="课程介绍"
                        rules={[
                            () => ({
                                validator(rule, value) {
                                    // eslint-disable-next-line prefer-promise-reject-errors
                                    if (value && [...value].length > 150) return Promise.reject('字数不能超过150个');
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                    >
                        {isEditFlag || isAddFlag ? <Input.TextArea placeholder="请输入课程介绍（150字以内...）" rows={4} />
                            : <div style={{ wordBreak: 'break-word' }}>{this.state.intro}</div>}
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        {(isEditFlag || isAddFlag) && <Button type="primary" htmlType="submit">提交</Button>}
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
