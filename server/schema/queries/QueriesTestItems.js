const mongoose 	= require('mongoose')
const graphql 	= require('graphql')

const TestItem 			= mongoose.model('testItem')
const TestItemType 	= require('../types/TestItemType')

const { GraphQLList, GraphQLID, GraphQLNonNull } = graphql

module.exports = {
	testItems: {
		type: new GraphQLList(TestItemType),
		args: {
			testId: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parent, args) {
			return TestItem.list(args, { value: 1 })
		}
	},
	testItem: {
		type: TestItemType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parent, args) {
			return TestItem.item(args)
		}
	},
}
