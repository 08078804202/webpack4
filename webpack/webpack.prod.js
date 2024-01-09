const {merge} = require("webpack-merge")
const common = require("./webpack.common")
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
    mode: "production",//开发模式
    module: {
        rules: [
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
                    MiniCssExtractPlugin.loader,
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
                    MiniCssExtractPlugin.loader,
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
            filename: "css/[name].[hash].css",
            chunkFilename: "css/[id].[hash].css",
        }),
        new CleanWebpackPlugin(), //清除旧文件
    ],

})