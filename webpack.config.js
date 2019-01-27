/*
* @Author: zengxiangfei
* @Date:   2019-01-24 22:07:08
* @Last Modified by:   zengxiangfei
* @Last Modified time: 2019-01-27 16:04:26
*/

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin   = require('html-webpack-plugin');

// 环境变量配置，dev / online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';

console.log(WEBPACK_ENV);


// 获取html-webpack-plugin参数的方法 
var getHtmlConfig = function(name, title){
    return {
        template    : './src/view/' + name + '.html',
        filename    : 'view/' + name + '.html',
        title       : title,
        inject      : true,
        hash        : true,
        chunks      : ['common', name]
    };
};

var config = {
  entry: {
    'common' : ['./src/page/common/common.js'],
    'index' : ['./src/page/index/index.js'],
    'login' : ['./src/page/login/login.js'],
  },
  output: {
    filename: 'js/[name].js',
    // path: path.resolve(__dirname, 'dist')
    path: './dist',
    publicPath: '/dist'
  },
  externals: {
    'jquery' : 'window.jQuery'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
      { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },

    ]
  },
  plugins: [
    // 独立通用模块到js/base.js
    new webpack.optimize.CommonsChunkPlugin({
        name : 'common',
        filename : "js/base.js"
      }),
    //把css单独打包到文件里
    new ExtractTextPlugin('css/[name].css'),
    //html模版的处理
    new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
    new HtmlWebpackPlugin(getHtmlConfig('login', '登陆'))
  ]
};

if('dev' == WEBPACK_ENV){
  config.entry.common.push('webpack-dev-server/client?http://localhost:8086/');
}


module.exports = config;