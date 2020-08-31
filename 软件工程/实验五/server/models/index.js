/*
 * @Author: zhangl
 * @Date: 2020-05-13 11:33:56
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-23 02:43:53
 * @FilePath: /server/models/index.js
 * @Description: Do not edit
 */
// 基础模版
class BaseModal {
    constructor(data) {
        this.result = data;
    }
}

// 成功模版
class SuccessModal extends BaseModal {
    constructor(data) {
        super(data);
        this.code = 0;
        this.msg = 'OK';
    }
}

// 失败模版
class ErrorModal extends BaseModal {
    constructor(data) {
        super(data);
        this.code = -1;
        this.mgs = 'ERROR';
    }
}

module.exports = {
    SuccessModal,
    ErrorModal,
};
