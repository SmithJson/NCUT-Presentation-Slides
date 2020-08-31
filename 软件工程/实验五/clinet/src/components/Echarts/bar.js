/*
 * @Author: zhangl
 * @Date: 2020-05-26 21:38:38
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-26 22:34:41
 * @FilePath: /clinet/src/components/Echarts/bar.js
 * @Description: Do not edit
 */
import React, { Component } from 'react';
import { Card } from 'antd';
import ReactEcharts from 'echarts-for-react';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/axis';

export default class Bar extends Component {
    getOptions = option => {
        const options = {
            tooltip: { // 提示组件
                trigger: 'axis',
            },
            toolbox: {
                feature: {
                    saveAsImage: { show: true },
                },
            },
            xAxis: { // X轴
                axisLabel: {
                    interval: 0,
                    formatter(value) {
                        let ret = '';
                        const maxLength = 5;
                        const valLength = value.length;
                        const rowN = Math.ceil(valLength / maxLength);
                        if (rowN > 1) {
                            for (let i = 0; i < rowN; i += 1) {
                                let temp = '';
                                const start = i * maxLength;
                                const end = start + maxLength;
                                temp = `${value.substring(start, end)}\n`;
                                ret += temp;
                            }
                            return ret;
                        }
                        return value;
                    },
                },
                data: option.xAxis,
            },
            yAxis: { // y轴
                type: 'value',
            },
            series: [ // 数据源
                {
                    name: '总人数',
                    type: 'bar',
                    data: option.series,
                },
            ],
        };
        return options;
    }

    render() {
        return (
            <div>
                <Card title="学生选课情况统计">
                    <ReactEcharts option={this.getOptions(this.props.option)} lazyUpdate={true} />
                </Card>
            </div>
        );
    }
}
