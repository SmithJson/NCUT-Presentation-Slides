/*
 * @Author: zhangl
 * @Date: 2020-05-19 15:24:39
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-27 00:33:38
 * @FilePath: /clinet/src/pages/teach/list.js
 * @Description: 授课管理
 */
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Popconfirm, message, Button } from 'antd';
import { WithBreadcrumb, AntdTable, AuthButton } from '../../components';
import { createPagination } from '../../tools';
import { WEEK, TEACH_STATE } from '../../config';
import { fetchTeachList, deleteTeach, fetchChoose } from '../../api';

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
            title: '课程名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '讲师',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '授课地点',
            dataIndex: 'place',
            key: 'place',
        },
        {
            title: '星期',
            dataIndex: 'week',
            render: text => WEEK[text],
        },
        {
            title: '授课时间',
            dataIndex: 'time',
            render: text => this.props.times
                .filter(item => text.indexOf(String(item.id)) > -1)
                .map(item => item.remark)
                .join('、'),
        },
        {
            title: '教学状态',
            dataIndex: 'state',
            render: text => TEACH_STATE[text],
        },
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 150,
            render: (text, record) => {
                const map = new Map();
                const map2 = new Map();
                map.set('view', <Link className="btn-primary" to={`/teach/${record.id}`}>查看</Link>);
                map.set('edit', <Link to={`/edit/teach/${record.id}`}>编辑</Link>);
                map.set('del', (
                    <Popconfirm
                        title={'确定是否删除该记录 ?'}
                        onConfirm={() => this.handleDeleteTeach(record)}
                    >
                        <a className="btn-error">删除</a>
                    </Popconfirm>
                ));
                map2.set('view', (
                    <Popconfirm
                        title={'确定选修该课程 ?'}
                        onConfirm={() => this.handleChangeChooseCourse(record)}
                    >
                        <a>选修</a>
                    </Popconfirm>
                ));
                return (
                    <Fragment>
                        <div style={{ display: 'flex' }}>
                            <AuthButton data={map} currentPage={'teach'} />
                            <AuthButton data={map2} currentPage={'choose'} />
                        </div>
                    </Fragment>
                );
            },
        },
    ]

    componentDidMount() {
        this.fetchList();
    }

    fetchList = () => {
        fetchTeachList(this.params).then(res => this.setState({ ...res }));
    }

    handleDeleteTeach = params => {
        deleteTeach(params).then(res => {
            message.success({ content: res });
            this.fetchList();
        });
    }

    handleChangePagination = page => {
        this.params.page = page;
        this.fetchList();
    }

    handleChangeChooseCourse = params => {
        fetchChoose({ id: params.course_id }).then(res => {
            message.success({ content: res });
            this.fetchList();
        });
    }

    render() {
        const map = new Map();
        map.set('add', (
            <Button type="primary">
                <Link to="/add/teach">添加授课</Link>
            </Button>
        ));
        return (
            <div className="teach-list-container content-wrap">
                <div className="search-header-container">
                    <AuthButton data={map} currentPage={'teach'} />
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
