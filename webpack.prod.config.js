
module.exports = {
  
  mode: 'production',
  
	entry: {
		administrator: __dirname + '/client/pages/administrator'
	},
  
  output: {
    path: __dirname + '/public',
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
