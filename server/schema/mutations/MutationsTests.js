const graphql = require('graphql')
const mongoose = require('mongoose')

const Test 			= mongoose.model('test')
const TestType 	= require('../types/TestType')

const { GraphQLString, GraphQLNonNull, GraphQLID } = graphql

module.exports = {
	addTest: {
		type: TestType,
		args: {
			name: { type: new GraphQLNonNull(GraphQLString) }
		},
		resolve(parentValue, args) {
			return Test.add(args)
		}
	},
	editTest: {
		type: TestType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) },
			name: { type: new GraphQLNonNull(GraphQLString) },
		},
		resolve(parentValue, args) {
			return Test.edit(args)
		}
	},
	deleteTest: {
		type: TestType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parentValue, args) {
			return Test.del(args, [
				{ model: 'testItem', field: 'testId' }
			])
		}
	},
}
