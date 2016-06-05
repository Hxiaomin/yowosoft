var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var host = '127.0.0.1';
var port = 8888;
//生成公用代码
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');


//生成html首页模板
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: false,
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        swal: true
    },
    entry: [
      path.resolve(__dirname, 'src/index.js')
    ],
    output: {
        path: __dirname + '/static',
        publicPath: '/',
        filename: 'bundle.[hash].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
          test: /\.less$/,
          include: path.resolve(__dirname, 'src'),
          //loader: 'style!css!sass'
          loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
        },
        {
          test: /\.js|jsx$/,
          exclude: /(node_modules|bower_components)/, 
          loader: 'babel', 
          query: {
            presets: ['es2015', 'react'],
            plugins: ['transform-runtime'],
            cacheDirectory: true,
          }
        }]
    },
  	plugins: [
          new webpack.ProvidePlugin({
              Http: path.resolve(__dirname, 'src/base/Http.js'),
              Utility: path.resolve(__dirname, 'src/base/Utility.js'),
              getToggle: path.resolve(__dirname, 'src/base/toggle.js')
          }),
      		new ExtractTextPlugin("style.[hash].css", {
                allChunks: true,
                disable: false
          }),
          commonsPlugin,
          new HtmlWebpackPlugin({
            title: 'react_web',
            template: 'reactTpl.html', // Load a custom template
            filename: 'index.html', 
            inject: 'body' // Inject all scripts into the body 
          })
    ]
};