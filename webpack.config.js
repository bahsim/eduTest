module.exports = {

  mode: 'development',

  devtool: "inline-source-map",

	entry: {
		administrator: [ __dirname + '/client/pages/administrator' ]
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
        'test': /\.tsx?$/,
        'loaders': ['babel-loader','ts-loader'],
        'exclude': [/node_modules/]
      },
      {
        'test': /\.(jsx?)$/,
        'loaders': ['babel-loader'],
        'exclude': [/node_modules/]
      }
		]
  }
}
