/*
 * @Author: zhangl
 * @Date: 2020-05-19 23:48:05
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-27 10:33:52
 * @FilePath: /clinet/src/pages/teach/detail.js
 * @Description: 授课详情
 */
import React, { Component } from 'react';
import {
    Form,
    Button,
    Input,
    message,
    Select,
    Radio,
} from 'antd';
import { connect } from 'react-redux';
import {
    fetchTeach,
    updateTeach,
    fetchCourseList,
    fetchTeacherList,
} from '../../api';
import { WEEK, TEACH_STATE } from '../../config';
import { WithBreadcrumb, MyUpload } from '../../components';

const { Option } = Select;

@WithBreadcrumb()
@connect(
    state => ({ ...state }),
)
export default class Detail extends Component {
    state = {
        searchCourse: [],
        searchTeacher: [],
        files: [],
        time: [],
    }

    componentDidMount() {
        const { params } = this.props.match;
        if (!params.id) return;
        this.fetchTeach();
    }

    fetchTeach = () => {
        const { params } = this.props.match;
        fetchTeach(params).then(res => {
            const teacherId = res.username.map(item => item.id)[0];
            const courseId = res.name.map(item => item.id)[0];
            this.setState({ ...res, teacherId, courseId });
            this.mForm.setFieldsValue({ ...res, teacherId, courseId });
        });
    }

    updateTeach = values => {
        updateTeach(values).then(() => {
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
        this.updateTeach(newValues);
    }

    handleSearchTeacher = value => {
        clearTimeout(this.id);
        this.id = setTimeout(() => {
            if (value) {
                fetchTeacherList({ scene: 'all', search: value, noLoading: true }).then(res => {
                    this.setState({ searchTeacher: res });
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
                range: '${label}区间 ${min} - ${max}岁',
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
        let teacherArr = [...(this.state.username || []), ...this.state.searchTeacher];
        const teacherIds = [...new Set(teacherArr.map(item => item.id))];
        teacherArr = teacherArr.filter(item => {
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
                        name="teacherId"
                        label="教师名"
                        rules={[
                            { required: true },
                        ]}
                    >
                        {isEditFlag || isAddFlag ? (
                            <Select
                                showSearch
                                defaultActiveFirstOption={false}
                                showArrow={false}
                                onSearch={this.handleSearchTeacher}
                                notFoundContent={null}
                                filterOption={false}
                                placeholder="请选择讲师"
                            >
                                {teacherArr.map(
                                    item => <Option key={item.id} value={item.id}>{item.value}</Option>,
                                )}
                            </Select>
                        )
                            : <div>{(this.state.username || []).map(item => item.value).join('、')}</div>}
                    </Form.Item>
                    <Form.Item
                        name="place"
                        label="授课地点"
                        rules={[
                            { required: true },
                        ]}
                    >
                        {isAddFlag || isEditFlag ? <Input placeholder="请输入授课地点" /> : <div>{this.state.place}</div>}
                    </Form.Item>
                    <Form.Item
                        name="week"
                        label="星期"
                        rules={[
                            { required: true },
                        ]}
                    >
                        {isEditFlag || isAddFlag ? (
                            <Select
                                placeholder="请选择星期"
                                allowClear
                            >
                                {Object.keys(WEEK).map(item => (
                                    <Option key={item} value={item}>{WEEK[item]}</Option>
                                ))}
                            </Select>
                        )
                            : <div>{this.state.week && WEEK[this.state.week]}</div>}
                    </Form.Item>
                    <Form.Item
                        name="time"
                        label="上课时间段"
                        rules={[
                            { required: true },
                        ]}
                    >
                        {isEditFlag || isAddFlag ? (
                            <Select
                                placeholder="请选择时间段"
                                mode="multiple"
                                allowClear
                            >
                                {this.props.times.map(item => (
                                    <Option key={`${item.id}`} value={`${item.id}`}>{item.remark}</Option>
                                ))}
                            </Select>
                        )
                            : <div>{this.props.times
                                .filter(item => this.state.time.indexOf(String(item.id)) > -1)
                                .map(item => item.remark)
                                .join('、')}</div>}
                    </Form.Item>
                    <Form.Item name="state" label="课程状态">
                        {isEditFlag || isAddFlag ? (
                            <Radio.Group>
                                {Object.keys(TEACH_STATE).map(item => <Radio value={item}>{TEACH_STATE[item]}</Radio>)}
                            </Radio.Group>
                        ) : <div>{TEACH_STATE[this.state.state] || ''}</div>}
                    </Form.Item>
                    <Form.Item name="files" label="课件">
                        {isEditFlag || isAddFlag ? <MyUpload /> : (
                            <ul className="file-list" style={{ padding: 0 }}>
                                {this.state.files.map((item, index) => (
                                    <li key={index}>
                                        <a
                                            href={URL.createObjectURL(new Blob([item.value]))}
                                            download={item.key}
                                            target="_blank"
                                        >
                                            {item.key}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        {(isEditFlag || isAddFlag) && <Button type="primary" htmlType="submit">提交</Button>}
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
