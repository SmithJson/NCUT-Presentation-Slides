/*
 * @Author: zhangl
 * @Date: 2020-05-27 01:29:34
 * @LastEditors: zhangl
 * @LastEditTime: 2020-06-05 13:23:02
 * @FilePath: /clinet/src/components/antd/MyUpload/index.js
 * @Description: 文件上传
 */
import React, { Component } from 'react';

export default class MyUpload extends Component {
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.previewList.length === 0) {
            return {
                previewList: nextProps.value || [],
            };
        }
        return null;
    }

    state = {
        filesList: [],
        previewList: [],
        loading: false,
    }

    handleFileChange = e => {
        const { files } = e.target;
        const res = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const file of files) res.push(file);
        this.setState({
            filesList: [...res, ...this.state.filesList],
        }, () => {
            const values = this.state.filesList.map(item => ({
                key: item.name,
                value: URL.createObjectURL(item),
            }));
            const newPreviewList = [...values, ...this.state.previewList];
            if (this.props.onChange) this.props.onChange(newPreviewList);
            this.setState({
                filesList: [],
                previewList: [...values, ...this.state.previewList],
            });
        });
    }

    handleRemoveFile = file => {
        const { previewList } = this.state;
        const values = previewList.filter(item => file.key !== item.key);
        if (this.props.onChange) this.props.onChange(values);
        this.setState({ previewList: [...values] });
    }

    render() {
        return (
            <div className="upload-container">
                <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={this.handleFileChange}
                    multiple
                />
                <ul className="file-list" style={{ padding: 0 }}>
                    {this.state.previewList.map((item, index) => {
                        console.log(item);
                        return (
                            <li style={{ display: 'flex', justifyContent: 'space-between' }} key={index}>
                                <a
                                    href={URL.createObjectURL(new Blob([item.value]))}
                                    download={item.key}
                                    target="_blank"
                                >
                                    {item.key}
                                </a>
                                <a className="btn-error" onClick={() => this.handleRemoveFile(item)}>删除</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
