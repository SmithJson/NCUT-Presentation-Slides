/*
 * @Author: zhangl
 * @Date: 2020-05-29 17:49:42
 * @LastEditors: zhangl
 * @LastEditTime: 2020-06-03 10:38:41
 * @FilePath: /exp1/compiler.js
 * @Description: Do not edit
 */
const fs = require('fs');
const path = require('path');
const Grid = require("console-grid");

const grid = new Grid();

/**
 *
 *  解析文件
 * @param {String} filePath
 * @returns
 */

function compilerFile(filePath) {
    const result = [];
    let data = fs.readFileSync(path.join(__dirname, `./${filePath}`), { encoding: 'utf8' });
    const ignoreExp = new RegExp('/\*(.?)\*/', 'g');
    const keys = /IF|THEN|ELSE|GOTO/;

    // 处理注释代码
    data = data.replace(ignoreExp, '');

    // 处理空格
    data = (data.split(/\s/g) || []).filter(c => c);

    // 处理字符串换行
    data = data.reduce((pre, cur) => {
        if (/\\/.test(cur)) return (pre + cur).replace(/\\/g, '');
        return pre += cur + ' ';
    }, '')
        .split(/\s/g);

    data.forEach(item => {
        if (keys.test(item));
        // 将字符串的每一部分单独解析出来
        const matchArr = item.match(/\d+|[a-zA-Z\_]+|[\(\)\:]+|[\>\<\=\+\-\*\/]+/g);
        if (!matchArr) return;
        matchArr.forEach((c, i, arr) => {
            if (keys.test(c)) result.push({ type: '关键字', value: c });
            else if (/[\>\<\=]+/g.test(c)) result.push({ type: '运算符', value: c });
            else if (/[a-zA-Z\_]+/g.test(c)) result.push({ type: '标识符', value: c });
            else if (/[\(\)\:]+/g.test(c)) result.push({ type: '界符', value: c });
            else if (!/[\>\<\=\+\-\*\/]+/g.test(arr[i - 1])) result.push({ type: '标号', value: c });
            else result.push({ type: '常数', value: c });
        });
    });

    return result;
}

function init() {
    const readline = require('readline');
    const r1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    r1.question('请输入文件：', filePath => {
        if (!filePath) {
            console.log('文件不存在');
        } else {
            const rows = compilerFile(filePath);
            var data = {
                option: {
                    sortField: "name",
                },
                columns: [
                    {
                        id: "type",
                        name: "类型",
                        type: "string",
                        maxWidth: 40,
                    },
                    {
                        id: "value",
                        name: "值",
                        type: "string",
                        maxWidth: 40,
                    },
                ],
                rows,
            };
            fs.writeFileSync('result.txt', JSON.stringify(grid.render(data), null, 4), {
                encoding: 'utf-8',
                flag: 'w'
            })
        }
        process.exit();
    });
}

init();
