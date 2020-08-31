/*
 * @Author: zhangl
 * @Date: 2020-05-14 15:33:49
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-26 22:37:54
 * @FilePath: /clinet/src/pages/elective/list.js
 * @Description: 选课管理
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Popconfirm,
    message,
    Button,
    Modal,
} from 'antd';
import {
    WithBreadcrumb,
    AntdTable,
    AuthButton,
    EchartsBar,
} from '../../components';
import { createPagination } from '../../tools';
import { BINGO } from '../../config';
import { fetchElectiveList, deleteElective, fetchStatistic } from '../../api';

@WithBreadcrumb()
@connect(
    state => ({ ...state }),
)
export default class List extends Component {
    state = {
        list: [],
        total: 0,
        visible: false,
        statistic: {
            xAxis: [],
            series: [],
        },
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
            title: '学生',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '成绩',
            dataIndex: 'score',
            key: 'score',
        },
        {
            title: '中签',
            dataIndex: 'bingo',
            render: text => BINGO[text],
        },
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 150,
            render: (text, record) => {
                const map = new Map();
                map.set('view', <Link className="btn-primary" to={`/elective/${record.id}`}>查看</Link>);
                map.set('edit', <Link to={`/edit/elective/${record.id}`}>编辑</Link>);
                map.set('del', (
                    <Popconfirm
                        title={'确定是否删除该记录 ?'}
                        onConfirm={() => this.handleDeleteElective(record)}
                    >
                        <a className="btn-error">删除</a>
                    </Popconfirm>
                ));
                return <AuthButton data={map} currentPage={'elective'} />;
            },
        },
    ]

    componentDidMount() {
        this.fetchList();
    }

    fetchList = () => {
        fetchElectiveList(this.params).then(res => this.setState({ ...res }));
    }

    fetchStatistic = () => {
        fetchStatistic().then(res => {
            const xAxis = res.map(item => item.name);
            const series = res.map(item => item.count);
            const statistic = { xAxis, series };
            this.setState({
                statistic,
            });
        });
    }

    handleDeleteElective = params => {
        deleteElective(params).then(res => {
            message.success({ content: res });
            this.fetchList();
        });
    }

    handleChangePagination = page => {
        this.params.page = page;
        this.fetchList();
    }

    handleToggleStatisticModal = () => {
        this.setState({
            visible: !this.state.visible,
        }, () => {
            if (this.state.visible) {
                this.fetchStatistic();
            }
        });
    }

    render() {
        const map = new Map();
        const map2 = new Map();
        map.set('add', (
            <Button type="primary">
                <Link to="/add/elective">添加选课</Link>
            </Button>
        ));
        map2.set('view', (
            <Button type="primary" onClick={this.handleToggleStatisticModal}>统计</Button>
        ));
        return (
            <div className="elective-list-container content-wrap">
                <div className="search-header-container" style={{ display: 'flex' }}>
                    <AuthButton data={map} currentPage={'elective'} />&nbsp;
                    <AuthButton data={map2} currentPage={'statistical'} />
                </div>
                <AntdTable
                    data={this.state.list}
                    columns={this.columns}
                    pagination={createPagination(this.state.total, this.handleChangePagination)}
                />
                <Modal
                    visible={this.state.visible}
                    footer={null}
                    onCancel={this.handleToggleStatisticModal}
                >
                    <EchartsBar option={this.state.statistic} />
                </Modal>
            </div>
        );
    }
}
