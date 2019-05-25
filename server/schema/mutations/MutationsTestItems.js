const graphql = require('graphql')
const mongoose = require('mongoose')

const TestItem 			= mongoose.model('testItem')
const TestItemType 	= require('../types/TestItemType')

const { GraphQLInputObjectType, GraphQLString, GraphQLNonNull, GraphQLID,
				GraphQLList, GraphQLBoolean } = graphql

const TestItemVariantType = new GraphQLInputObjectType({
	name: 'TestItemVariantType',
	fields: {
		value	: { type: new GraphQLNonNull(GraphQLString)},
		mark	: { type: new GraphQLNonNull(GraphQLBoolean)},
	}
})

module.exports = {
	addTestItem: {
		type: TestItemType,
		args: {
			testId	: { type: new GraphQLNonNull(GraphQLString) },
			value		: { type: new GraphQLNonNull(GraphQLString) },
			variants: { type: new GraphQLList(TestItemVariantType) },
		},
		resolve(parentValue, args) {
			return TestItem.add(args)
		}
	},
	editTestItem: {
		type: TestItemType,
		args: {
			id			: { type: new GraphQLNonNull(GraphQLID) },
			value		: { type: new GraphQLNonNull(GraphQLString) },
			variants: { type: new GraphQLList(TestItemVariantType) },
		},
		resolve(parentValue, args) {
			return TestItem.edit(args)
		}
	},
	deleteTestItem: {
		type: TestItemType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parentValue, args) {
			return TestItem.del(args)
		}
	},
}
