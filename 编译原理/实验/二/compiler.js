/*
 * @Author: zhangl
 * @Date: 2020-06-06 21:45:40
 * @LastEditors: zhangl
 * @LastEditTime: 2020-06-09 17:05:16
 * @FilePath: /二/compiler.js
 * @Description:
 * 算术表达式->项|算术表达式+项|算术表达式-项
 * 项->因子|项*因子|项/因子
 * 因子->变量|常数|(算术表达式)
 *
 *         算符优先关系表
 * ----------------------------------
 *      +   -   *   /   (   )   i   #
 *  +   >   >   <   <   <   >   <   >
 *  -   >   >   <   <   <   >   <   >
 *  *   >   >   >   >   <   >   <   >
 *  /   >   >   >   >   <   >   <   >
 *  (   <   <   <   <   <   =   <   ?
 *  )   >   >   >   >   ?   >   ?   >
 *  i   >   >   >   >   ?   >   ?   >
 *  #   <   <   <   <   <   ?   <   =
 * ----------------------------------
 */
const fs = require("fs");
const path = require("path");

const Grid = require("console-grid");

const grid = new Grid();

// 1表示 >, -1表示 <, 0表示 =, -2表示错误
const table = [
    [1, 1, -1, -1, -1, 1, -1, 1],
    [1, 1, -1, -1, -1, 1, -1, 1],
    [1, 1, 1, 1, -1, 1, -1, 1],
    [1, 1, 1, 1, -1, 1, -1, 1],
    [-1, -1, -1, -1, -1, 0, -1, -2],
    [1, 1, 1, 1, -2, 1, -2, 1],
    [1, 1, 1, 1, -2, 1, -2, 1],
    [-1, -1, -1, -1, -1, -2, -1, 0],
];
// 可归约字符串
const word = ["N+N", "N-N", "N*N", "N/N", ")N(", "i"];
let expStrings = [];
let inpStrings = [];
// 判断是表达式
let isExp = false,
    isChar = false,
    i = -1,
    j = -1;

init("./预处理.txt");

function init(filename) {
    const str = fs.readFileSync(path.join(__dirname, filename), {
        encoding: "utf-8",
    });
    const txt = str.split("");
    // 处理算术表达式
    txt.forEach((c, index) => {
        if (c !== "=" && c !== "#" && !isExp) return;
        if ((txt[index - 1] === "<" || txt[index - 1] === ">") && c === "=") return;
        if (c === "#") return;
        if (isExp) {
            expStrings[i] = ((expStrings[i] || "") + c).trim();
            if (isalnum(c) && !isChar) {
                inpStrings[j] = ((inpStrings[j] || "") + "i").trim();
                isChar = true
            } else if (!isalnum(c)) {
                inpStrings[j] = ((inpStrings[j] || "") + c).trim();
                isChar = false;
            }
        }
        if (c === "=") {
            isExp = true;
            i++;
            j++
            return;
        }
        if (c === " ") isExp = false;
    });
    inpStrings = inpStrings.map(item => "#" + item + "#");
    // 分析
    priorAnalysis();
}

function priorAnalysis() {
    inpStrings.forEach((inp, index) => {
        console.log("\n");
        console.log("算数表达式：", expStrings[index]);
        console.log("转换为输入串：", inp.slice(1));
        console.log("步骤号 符号栈 优先关系 当前分析符 剩余输入串 动作");

        let step = 1;
        const stack = []; // 符号栈
        const surplus = Array.from(inp); // 剩余输入串
        let cur = surplus.shift();
        stack.push(cur);
        console.log(`${step++} ${stack.join("")} < null ${surplus.join("")} 移进`);
        while (surplus.length) {
            let top = stack.length - 1;
            cur = surplus[0];
            let j = stack[top] === "N" ? top - 1 : top;
            // console.log(j, top, stack[j], cur, chDir(stack[j]) - 1, chDir(cur) - 1, table[chDir(stack[j]) - 1][chDir(cur) - 1]);
            while (table[chDir(stack[j]) - 1][chDir(cur) - 1] === 1) {
                let q;
                let ch = "";
                do { // 找到归约的结束位置
                    q = stack[j];
                    if (stack[j - 1] !== "N")
                        j = j - 1;
                    else
                        j = j - 2;
                } while (table[chDir(stack[j]) - 1][chDir(q) - 1] !== -1);
                while ((top - j) != 0) {
                    ch += stack.pop();
                    top = stack.length - 1;
                }
                for (let m = 0; m <= 5; m++) {
                    if (word.includes(ch))
                        str = 'N';
                }
                stack.push(str);
                console.log(`${step++} ${stack.join("")} > ${cur} ${surplus.join("")} 归约`);
            }
            if (table[chDir(stack[j]) - 1][chDir(cur) - 1] === -1) {
                cur = surplus.shift();
                stack.push(cur);
                console.log(`${step++} ${stack.join("")} < ${cur} ${surplus.join("")} 移进`);
            } else {
                if (table[chDir(stack[j]) - 1][chDir(cur) - 1] === 0) {
                    cur = surplus.shift();
                    stack.push(cur);
                    console.log(`${step++} ${stack.join("")} = ${cur} ${surplus.join("")} 移进`);
                } else {
                    error(j);
                    stack.push("#");
                    break;
                }
            }
        }

        console.log("\n");
    });
}

function chDir(ch) {
    switch (ch) {
        case "+":
            return 1;
        case "-":
            return 2;
        case "*":
            return 3;
        case "/":
            return 4;
        case "(":
            return 5;
        case ")":
            return 6;
        case "i":
            return 7;
        case "#":
            return 8;
        default:
            return 0;
    }
}

function error(j) {
    if (chDir(stack[t]) == 6 || chDir(stack[t]) == 7) console.log("\n错误e2:缺少运算符!");
    else if (ch_di(stack[t]) == 5) console.log("\n错误e1:非法左括号!");
    else console.log("\n错误e3:非法右括号!");
}

function isalnum(char) {
    return /[a-zA-Z\d]/.test(char);
}
