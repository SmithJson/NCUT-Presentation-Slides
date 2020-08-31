/*
 * @Author: zhangl
 * @Date: 2019-08-19 00:08:58
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-18 08:35:21
 * @Description: eslint配置,
 */
const OFF = 0; // 关闭
const WARN = 1; // 警告
const ERROR = 2; // 报错

module.exports = {
    root: true,
    extends: [
        'prettier',
        'airbnb-base',
    ], // 校验规范
    env: { // 使用环境预定义的全局变量
        commonjs: true,
        browser: true,
        es6: true,
        jquery: true,
        node: true,
    },
    parser: 'babel-eslint', // 解析器
    parserOptions: {
        ecmaVersion: 6, // ECMAScript版本
        sourceType: 'module', // 代码在ECMAScript模块里,
        ecmaFeatures: { // 使用JS未来特性
            legacyDecorators: true, // 支持装饰器写法
            jsx: true, // 启用jsx
        },
    },
    globals: { // 设置全局变量
        NODE_ENV: true,
        PROXY: true,
    },
    plugins: [
        'prettier',
        'import',
        'typescript',
        'jsx-a11y',
        'react',
        'react-hooks',
    ],
    rules: { // 自定义规则

        "camelcase": OFF,
        // "prefer-destructuring": [
            // ERROR,
            // {
                // "array": true,
                // "object": true
            // }, {
                // "enforceForRenamedProperties": true,
            // }
        // ],
        "no-template-curly-in-string": OFF,
        'no-console': process.env.NODE_ENV === 'production' ? ERROR : WARN,
        'no-debugger': process.env.NODE_ENV === 'production' ? ERROR : WARN,
        'arrow-parens': [ // 单个参数不使用()
            ERROR,
            'as-needed',
        ],
        'max-depth': [ // 语句的最大可嵌套深度
            ERROR,
            3,
        ],
        'max-len': [ // 单行最大个数
            ERROR,
            {
                'code': 120,
                'tabWidth': 2,
                'ignoreComments': true,
                'ignoreUrls': true,
                'ignoreStrings': false,
                'ignoreRegExpLiterals': true
            },
        ],
        'consistent-return': OFF, // 禁用箭头函数必须有返回值
        'class-methods-use-this': OFF, // 关闭类方法使用this调用
        'import/prefer-default-export': OFF, // 关闭使用export default导出
        'import/no-extraneous-dependencies': OFF, // 引入不在dependencies里的模块
        'import/no-dynamic-require': OFF, // 关闭异步加载
        indent: [ // 缩进4个空格
            ERROR,
            4,
            {
                SwitchCase: 1,
            },
        ],
        'func-names': OFF, // 允许使用匿名函数
        'no-prototype-builtins': OFF, // 允许使用原型方法
        'no-param-reassign': [ // 允许参数重新赋值
            ERROR,
            {
                props: false,
            },
        ],
        'import/no-unresolved': OFF, // 关闭导入无效，由于使用了webpack alias 功能，所以关闭这个警告
        'react/jsx-uses-react': ERROR, // 防止React被错误地标记为未使用
        'react/jsx-uses-vars': ERROR, // 防止JSX中使用的变量被错误地标记为未使用
    },
    settings: {
        'import/resolver': { // 解决import/no-unresolved问题（eslint与webpack alias冲突问题）
            alias: {
                extensions: [
                    '.js',
                    '.jsx',
                    '.ts',
                    '.tsx',
                    '.json',
                ],
            },
        },
    },
};
