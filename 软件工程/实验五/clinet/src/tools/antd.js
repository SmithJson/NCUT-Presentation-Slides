/*
 * @Author: zhangl
 * @Date: 2020-05-15 14:10:50
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-18 11:11:44
 * @FilePath: /clinet/src/tools/antd.js
 * @Description: antd 工具
 */

/**
  *
  *
  * @param {*} total 页码总页数
  * @param {*} onChange 页码改变时间
  * @param {*} config antd pagination 其他配置
  */

export const createPagination = (total, onChange, config = {}) => ({
    total,
    onChange,
    hideOnSinglePage: true,
    showQuickJumper: true,
    showSizeChanger: false,
    ...config,
});

/**
 *
 * 将文件转换为 base64 格式
 * @param {*} img 图片 file 对象
 * @param {*} callback 图片加载完成后的回掉函数
 */
export const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
