
/*
 * @Author: ranruci 
 * @Date: 2017-12-22 15:22:38 
 * @Last Modified by: ranruci
 * @Last Modified time: 2017-12-22 22:04:38
 */
//引入处理css文件的插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//处理html模版插件
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack             = require('webpack');
//环境变量配置，dev、online
var WEBPACK_ENV        = process.env.WEBPACK_ENV ||'dev';
// console.log(WEBPACK_ENV)
//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name){
    return {
        template: './src/view/'+name+'.html',
        filename: 'view/'+name+'.html',
        inject  : true,
        hash    :true,
        chunks  :['common',name]
    };
};
// const path = require('path');
//webpack config
var config = {
    //  entry: './src/page/index/index.js',
     entry:{
         'common':['./src/page/common/index.js'],
         'index':['./src/page/index/index.js'],
         'login':['./src/page/login/index.js']
     },
     output: {
         path: 'dist',//存放路径
         publicPath:'/dist',//访问路径
         filename: 'js/[name].js'
     },
     //加载外部的模块
     externals:{
        'jquery':'window.jQuery'
     },
     //处理css的loader
     module:{
         loaders:[
             {
                 test:/\.css$/,loader:ExtractTextPlugin.extract("style-loader","css-loader"),

             },

             {//                                          将图片文件放到resource文件中
                test: /\.(png|jpg|gif|svg|woff|woff2|otf|ttf|ttc|eot)\??.*$/,loader: 'url-loader?limit=100&name=resource/[name].[ext]',},

         ]
     },
     //打包
     plugins:[
         //独立通用模块到js/base.js
         new webpack.optimize.CommonsChunkPlugin({
             name:'common',
             filename:'js/base.js'
         }),
         //把css单独打包到文件里
         new ExtractTextPlugin("css/[name].css"),
         //html模版的处理
         new HtmlWebpackPlugin(getHtmlConfig('index')),
         new HtmlWebpackPlugin(getHtmlConfig('login')),
         
        ],
        
 };

 if('dev' === WEBPACK_ENV){
     config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
 }

 module.exports = config;