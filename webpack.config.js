'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var path = require('path')
var webpack = require('webpack')

module.exports = {
  mode: 'development',
  devtool: NODE_ENV == 'development' ? "inline-source-map" : null,
  
	entry: {
		administrator: __dirname + '/ui/pages/administrator'
	},
  
  output: {
    path: __dirname + '/ui/dist',
    filename: '[name].js',
    publicPath: '/'
  },
	plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
			{
				test: /\.js$/,
				loaders: ['babel-loader'],
				exclude: /node_modules/
			}
		]
  }
}
