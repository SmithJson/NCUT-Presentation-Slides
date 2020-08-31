/*
 * @Author: zhangl
 * @Date: 2020-05-14 15:33:49
 * @LastEditors: zhangl
 * @LastEditTime: 2020-06-05 12:05:39
 * @FilePath: /clinet/src/pages/student/list.js
 * @Description: 学生管理
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Popconfirm, message, Button } from 'antd';
import { WithBreadcrumb, AntdTable, AuthButton } from '../../components';
import { createPagination } from '../../tools';
import { GENDER, REGISTERED } from '../../config';
import { fetchStudentList, deleteStudent } from '../../api';

@WithBreadcrumb()
@connect(
    state => ({ ...state }),
)
export default class List extends Component {
    state = {
        list: [],
        total: 0,
    }

    params = {
        page: 1,
        size: 10,
    }

    columns = [
        {
            title: '学号',
            dataIndex: 'id',
            key: 'id',
            width: 150,
        },
        {
            title: '姓名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '所属院校',
            dataIndex: 'schoolId',
            render: text => (this.props.school.find(item => item.id === text) || {}).value,
        },
        {
            title: '性别',
            dataIndex: 'gender',
            render: text => GENDER[text],
        },
        {
            title: '手机号',
            dataIndex: 'tel',
            key: 'tel',
            width: 150,
        },
        {
            title: '注册',
            dataIndex: 'registered',
            render: text => REGISTERED[text],
        },
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 150,
            render: (text, record) => {
                const map = new Map();
                map.set('view', <Link className="btn-primary" to={`/student/${record.id}`}>查看</Link>);
                map.set('edit', <Link to={`/edit/student/${record.id}`}>编辑</Link>);
                map.set('del', (
                    <Popconfirm
                        title={`确定是否删除：${record.username} ?`}
                        onConfirm={() => this.handleDeleteStudent(record)}
                    >
                        <a className="btn-error">删除</a>
                    </Popconfirm>
                ));
                return <AuthButton data={map} currentPage={'student'} />;
            },
        },
    ]

    componentDidMount() {
        this.fetchList();
    }

    fetchList = () => {
        fetchStudentList(this.params).then(res => this.setState({ ...res }));
    }

    handleDeleteStudent = params => {
        deleteStudent(params).then(res => {
            message.success({ content: res });
            this.fetchList();
        });
    }

    handleChangePagination = page => {
        this.params.page = page;
        this.fetchList();
    }

    render() {
        const map = new Map();
        map.set('add', (
            <Button type="primary">
                <Link to="/add/student">添加学生</Link>
            </Button>
        ));
        return (
            <div className="student-list-container content-wrap">
                <div className="search-header-container">
                    <AuthButton data={map} currentPage={'student'} />
                </div>
                <AntdTable
                    data={this.state.list}
                    columns={this.columns}
                    pagination={createPagination(this.state.total, this.handleChangePagination)}
                />
            </div>
        );
    }
}
