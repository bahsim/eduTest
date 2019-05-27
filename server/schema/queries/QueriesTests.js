const mongoose 	= require('mongoose')
const graphql 	= require('graphql')

const Test 			= mongoose.model('test')
const TestType 	= require('../types/TestType')

const { GraphQLList, GraphQLID, GraphQLNonNull } = graphql

module.exports = {
	tests: {
		type: new GraphQLList(TestType),
		resolve() {
			return Test.list({}, { name: 1 })
		}
	},
	test: {
		type: TestType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parent, args) {
			return Test.item(args)
		}
	},
}
