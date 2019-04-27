'use strict';

var path = require('path')
var webpack = require('webpack')

module.exports = {
  
  mode: 'production',
  
	entry: {
		administrator: __dirname + '/ui/pages/administrator'
	},
  
  output: {
    path: __dirname + '/ui/dist',
    filename: '[name].js',
    publicPath: '/'
  },
	
	plugins: [],
  
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
