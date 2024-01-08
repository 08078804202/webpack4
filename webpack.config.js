const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const devMode = process.env.NODE_ENV !== "production";
module.exports = {
    // entry:"./src/index.js",//单入口文件
    entry: { //多入口文件
        app: [
            // "@babel/polyfill",  //添加增强，解决旧浏览器不能识别API的问题。已弃用。
            'whatwg-fetch',  //解决旧浏览器不能识别fetch的问题。浏览器基本都可以用，不需要导入了。
            "./src/index.js"
        ],
        hello: "./src/hello.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
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
            { //使用css文件
                test: /\.css$/i,
                // use: ["style-loader", "css-loader"],  //从右向左,先css-loader => 后style-loader 。一般写法，css编译后会被打包到js里面。
                use: [ //释放css文件的写法
                    {
                        loader: MiniCssExtractPlugin.loader,
                        // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "./dist/css/",
                        },
                    },
                    "css-loader",
                ]
            },
            {//使用scss文件
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {//使用less文件
                test: /\.less$/i,
                use: [
                    // compiles Less to CSS
                    "style-loader",
                    "css-loader",
                    "less-loader",
                ],
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
        new MiniCssExtractPlugin({ //把编译后的js文件里面的css文件分离出来。
            // filename: "[name].css",
            // chunkFilename: "[id].css",
            // filename: devMode ? "[name].css" : "[name].[contenthash].css",
            // chunkFilename: devMode ? "[id].css" : "[id].[contenthash].css",
            filename: devMode ? "css/[name].css" : "css/[name].[hash].css",
            chunkFilename: devMode ? "css/[id].css" : "css/[id].[hash].css",
        }),
        new CleanWebpackPlugin(), //清除旧文件
    ],
    devServer: {  //服务器
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
    },
    mode: "development",//开发模式
    devtool: false, //编译后的代码可读性好一些
}