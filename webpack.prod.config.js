module.exports = {

  mode: 'production',

	entry: {
    administrator: [ __dirname + '/client/modules/administrator/index.js' ]
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
