const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const WebpackBar = require("webpackbar");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    // entry:"./src/index.js",//单入口文件
    entry: { //多入口文件
        app: [
            // "@babel/polyfill",  //添加增强，解决旧浏览器不能识别API的问题。已弃用。
            // 'whatwg-fetch',  //解决旧浏览器不能识别fetch的问题。浏览器基本都可以用，不需要导入了。
            "./src/index.js"
        ],
        hello: "./src/hello.js"
    },
    output: {
        path: path.resolve(__dirname, "..","dist"),
        // filename:"app.bundle.js"//单入口文件
        filename: "js/[name]-[hash].bundle.js",//多入口文件
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    "useBuiltIns": "entry",
                                    "corejs": "3.22",
                                    "debug": true  //调试模式
                                }]
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "version": "2023-05" }]
                        ]
                    }
                    // options: {
                    //   plugins: [require('@babel/plugin-transform-arrow-functions')]
                    // }
                }
            },
            {//照片
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // name: '[path][name].[ext]',
                            name: '[name].[ext]',
                            outputPath: "images/"
                        }
                    },
                    {//压缩文件
                        loader: 'image-webpack-loader',
                        options: {
                            // bypassOnDebug: true, // webpack@1.x
                            // disable: true, // webpack@2.x and newer
                        },
                    },
                ],
            },

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({//自动生成HTML文件 index.html 放在dist文件夹里
            title: "Hello",
            filename: "hello.html",
            template: "public/index-template.html",
            hash: true,
            chunks: ["hello"]    //导入不同的js
        }),
        new HtmlWebpackPlugin({//自动生成HTML文件 index.html 放在dist文件夹里
            title: "index",
            filename: "index.html",
            template: "public/index-template.html",
            hash: true,
            chunks: ["app"]   //导入不同的js
        }),
        new WebpackBar({
            color:"blue"
        }),//显示编译的进度
    ],
}