const express = require('express')
const models = require('./models');
const expressGraphQL = require('express-graphql')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const schema = require('./schema/schema')
const path = require('path')
const app = express()

const config = require('../config')

const appPort = process.env.APP_PORT 	|| config.appPort;
const appMode = process.env.NODE_ENV 	|| config.appMode;

if (appMode === 'development') {
	const webpack = require('webpack');
	const webpackDevMiddleware = require('webpack-dev-middleware');
	const webpackConfig = require('../webpack.config');
	const webpackCompiler = webpack(webpackConfig);

	app.use(
		webpackDevMiddleware(webpackCompiler, {
			noInfo: true,
			publicPath: webpackConfig.output.publicPath
		})
	);
}

const dbPath = process.env.MONGO_URI 	|| config.dbPath;

mongoose.Promise = global.Promise
mongoose.connect(dbPath, {useNewUrlParser: true})
mongoose.connection
	.once('open', () => {
		console.log('Connected to Mongo DB.')

		app.get("/admin*", (req, res) => {
			res.sendFile(path.join(__dirname, '..','client/modules/Administrator/index.html'))
		});

		app.listen(appPort, (error) => {
			if (error)
				return console.error(error);

			console.log("Server started on port", appPort);
		});
	})
	.on('error', error => console.log('Error connecting to MongoLab:', error));


app.use(bodyParser.json());
app.use('/api', expressGraphQL({
  schema,
  graphiql: true
}));

app.use(express.static(config.pathStatic));
