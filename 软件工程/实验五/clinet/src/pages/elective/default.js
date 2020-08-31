/*
 * @Author: zhangl
 * @Date: 2020-05-20 02:01:40
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-27 02:00:45
 * @FilePath: /clinet/src/pages/elective/default.js
 * @Description: 选课详情
 */
import React, { Component } from 'react';
import {
    Form,
    Button,
    message,
    Select,
    InputNumber,
    Radio,
} from 'antd';
import { connect } from 'react-redux';
import {
    fetchElective,
    updateElective,
    fetchCourseList,
    fetchStudentList,
} from '../../api';
import { BINGO } from '../../config';
import { WithBreadcrumb } from '../../components';

const { Option } = Select;

@WithBreadcrumb()
@connect(
    state => ({ ...state }),
)
export default class Detail extends Component {
    state = {
        searchCourse: [],
        searchStudent: [],
    }

    componentDidMount() {
        const { params } = this.props.match;
        if (!params.id) return;
        this.fetchElective();
    }

    fetchElective = () => {
        const { params } = this.props.match;
        fetchElective(params).then(res => {
            const studentId = res.username.map(item => item.id)[0];
            const courseId = res.name.map(item => item.id)[0];
            this.setState({ ...res, studentId, courseId });
            this.mForm.setFieldsValue({ ...res, studentId, courseId });
        });
    }

    updateElective = values => {
        updateElective(values).then(() => {
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
        this.updateElective(newValues);
    }

    handleSearchStudent = value => {
        clearTimeout(this.id);
        this.id = setTimeout(() => {
            if (value) {
                fetchStudentList({ scene: 'all', search: value, noLoading: true }).then(res => {
                    this.setState({ searchStudent: res });
                });
            }
        }, 1000);
    }

    handleSearchCourse = value => {
        clearTimeout(this.id);
        this.id = setTimeout(() => {
            if (value) {
                fetchCourseList({ scene: 'all', search: value, noLoading: true }).then(res => {
                    this.setState({ searchCourse: res });
                });
            }
        }, 1000);
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
                range: '${label}区间 ${min} - ${max}分',
            },
        };
        const { params } = this.props.match;
        const isAddFlag = params.method === 'add' && !params.id;
        const isEditFlag = params.method === 'edit' && params.id;
        let courseArr = [...(this.state.name || []), ...this.state.searchCourse];
        const courseIds = [...new Set(courseArr.map(item => item.id))];
        courseArr = courseArr.filter(item => {
            const index = courseIds.indexOf(item.id);
            if (index !== -1) {
                courseIds.splice(index, 1);
                return true;
            }
            return false;
        });
        let studentArr = [...(this.state.username || []), ...this.state.searchStudent];
        const teacherIds = [...new Set(studentArr.map(item => item.id))];
        studentArr = studentArr.filter(item => {
            const index = teacherIds.indexOf(item.id);
            if (index !== -1) {
                teacherIds.splice(index, 1);
                return true;
            }
            return false;
        });
        return (
            <div className="teach-detail-container content-wrap">
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
                        name="courseId"
                        label="课程名"
                        rules={[
                            { required: true },
                        ]}
                    >
                        {isEditFlag || isAddFlag ? (
                            <Select
                                showSearch
                                defaultActiveFirstOption={false}
                                showArrow={false}
                                onSearch={this.handleSearchCourse}
                                notFoundContent={null}
                                filterOption={false}
                                placeholder="请选择课程"
                            >
                                {courseArr.map(
                                    item => <Option key={item.id} value={item.id}>{item.value}</Option>,
                                )}
                            </Select>
                        )
                            : <div>{(this.state.name || []).map(item => item.value).join('、')}</div>}
                    </Form.Item>
                    <Form.Item
                        name="studentId"
                        label="学生名"
                        rules={[
                            { required: true },
                        ]}
                    >
                        {isEditFlag || isAddFlag ? (
                            <Select
                                showSearch
                                defaultActiveFirstOption={false}
                                showArrow={false}
                                onSearch={this.handleSearchStudent}
                                notFoundContent={null}
                                filterOption={false}
                                placeholder="请选择学生"
                            >
                                {studentArr.map(
                                    item => <Option key={item.id} value={item.id}>{item.value}</Option>,
                                )}
                            </Select>
                        )
                            : <div>{(this.state.username || []).map(item => item.value).join('、')}</div>}
                    </Form.Item>
                    <Form.Item
                        name="score"
                        label="成绩"
                        rules={[
                            {
                                type: 'number',
                                min: 0,
                                max: 100,
                            },
                        ]}
                    >
                        {isEditFlag || isAddFlag ? <InputNumber placeholder="成绩" />
                            : <div>{this.state.score || 0} 分</div>}
                    </Form.Item>
                    <Form.Item name="bingo" label="选课状态">
                        {isEditFlag || isAddFlag ? (
                            <Radio.Group>
                                {Object.keys(BINGO).map(item => <Radio value={item - 0}>{BINGO[item]}</Radio>)}
                            </Radio.Group>
                        ) : <div>{BINGO[this.state.bingo] || ''}</div>}
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        {(isEditFlag || isAddFlag) && <Button type="primary" htmlType="submit">提交</Button>}
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
