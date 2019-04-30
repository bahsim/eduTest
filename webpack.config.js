// const webpack = require('webpack')

module.exports = {
  
  mode: 'development',
	
  devtool: "inline-source-map",
  
	entry: {
		administrator: [
			// "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
			__dirname + '/client/pages/administrator'
		]
	},
  
  output: {
    path: __dirname + '/public',
    filename: '[name].js',
    publicPath: '/'
  },
	
	plugins: [
    // new webpack.HotModuleReplacementPlugin()
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
