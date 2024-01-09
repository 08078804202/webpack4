const { merge } = require("webpack-merge")
const common = require("./webpack.common")
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
    mode: "development",//开发模式
    devtool: false, //编译后的代码可读性好一些
    module: {
        rules: [
            { //使用css文件
                test: /\.css$/i,
                // use: ["style-loader", "css-loader"],  //从右向左,先css-loader => 后style-loader 。一般写法，css编译后会被打包到js里面。
                use: [ //释放css文件的写法
                    'style-loader',
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
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ //把编译后的js文件里面的css文件分离出来。
            // filename: "[name].css",
            // chunkFilename: "[id].css",
            // filename: devMode ? "[name].css" : "[name].[contenthash].css",
            // chunkFilename: devMode ? "[id].css" : "[id].[contenthash].css",
            filename: "css/[name].css",
            chunkFilename: "css/[id].css",
        }),
        new CleanWebpackPlugin(), //清除旧文件
    ],
    devServer: {  //服务器
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
        // quiet:true,  //true 编译时输出的记录不显示  不需要设置
        // client: {
        //     overlay: true,
        // },
        client: {
            overlay: {
                errors: true,
                warnings: false,
                runtimeErrors: true,
            },
        },
    },
})