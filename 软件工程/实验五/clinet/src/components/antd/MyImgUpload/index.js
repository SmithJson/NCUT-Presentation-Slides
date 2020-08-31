/*
 * @Author: zhangl
 * @Date: 2020-05-18 11:14:22
 * @LastEditors: zhangl
 * @LastEditTime: 2020-06-05 14:19:00
 * @FilePath: /clinet/src/components/antd/MyImgUpload/index.js
 * @Description: 文件上传组件（这个在后期会删掉）
 */
import React, { Component } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
// import { getBase64 } from '../../../tools';
import './index.less';

function beforeUpload(file) {
    const imgRex = /jpe?g|png|gif/ig;
    const isImg = imgRex.test(file.type);
    if (!isImg) {
        message.error('只支持 jpeg、png、gif 格式的图片');
    }
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
        message.error('只支持 1M 大小的图片');
    }
    return isImg && isLt1M;
}

export default class MyImgUpload extends Component {
    state = {
        imageUrl: '',
        loading: false,
    }

    componentDidMount() {
        this.setState({
            imageUrl: this.props.imageUrl || this.props.value,
        });
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        const checkType = beforeUpload(info.file);
        if (!checkType) return;
        const imageUrl = URL.createObjectURL(new Blob([info.file]));
        if (this.props.onChange) this.props.onChange(imageUrl);
        this.setState({
            imageUrl,
            loading: false,
        });
    };

    render() {
        const uploadButton = (
            <div>
                {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        // const { imageUrl } = this.state;
        return (
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={() => false}
                onChange={this.handleChange}
            >
                {this.props.value ? <img
                    src={this.props.value}
                    alt="avatar" style={{ width: '100%' }}
                />
                    : uploadButton}
            </Upload>
        );
    }
}
