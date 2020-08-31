/*
 * @Author: zhangl
 * @Date: 2020-05-14 15:56:09
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-19 15:17:03
 * @FilePath: /clinet/src/pages/course/list.js
 * @Description: 课程管理
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Popconfirm, message, Button } from 'antd';
import { WithBreadcrumb, AntdTable, AuthButton } from '../../components';
import { createPagination } from '../../tools';
import { fetchCourseList, deleteCourse } from '../../api';

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
            title: '课程号',
            dataIndex: 'id',
            key: 'id',
            width: 150,
        },
        {
            title: '课程名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '学时',
            dataIndex: 'cycle',
            render: text => `${text || 0} 学时`,
        },
        {
            title: '学分',
            dataIndex: 'credit',
            render: text => `${text || 0} 学分`,
        },
        {
            title: '先修课',
            dataIndex: 'prev',
            render: (text, record) => (record.prev || []).map(item => item.value).join('、'),
        },
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 150,
            render: (text, record) => {
                const map = new Map();
                map.set('view', <Link className="btn-primary" to={`/course/${record.id}`}>查看</Link>);
                map.set('edit', <Link to={`/edit/course/${record.id}`}>编辑</Link>);
                map.set('del', (
                    <Popconfirm
                        title={`确定是否删除：${record.name} ?`}
                        onConfirm={() => this.handleDeleteCourse(record)}
                    >
                        <a className="btn-error">删除</a>
                    </Popconfirm>
                ));
                return <AuthButton data={map} currentPage={'course'} />;
            },
        },
    ]

    componentDidMount() {
        this.fetchList();
    }

    fetchList = () => {
        fetchCourseList(this.params).then(res => this.setState({ ...res }));
    }

    handleDeleteCourse = params => {
        deleteCourse(params).then(res => {
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
                <Link to="/add/course">添加课程</Link>
            </Button>
        ));
        return (
            <div className="course-list-container content-wrap">
                <div className="search-header-container">
                    <AuthButton data={map} currentPage={'course'} />
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
