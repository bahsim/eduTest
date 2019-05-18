const graphql = require('graphql')
const mongoose = require('mongoose')

const TestItem = mongoose.model('testItem')

const TestItemType = require('../types/TestItemType')

const {
	GraphQLInputObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLID,
	GraphQLList,
	GraphQLBoolean,
} = graphql

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
		resolve(parentValue, { testId, value, variants }) {
			return (new TestItem({ testId, value, variants })).save()
		}
	},
	editTestItem: {
		type: TestItemType,
		args: {
			id			: { type: new GraphQLNonNull(GraphQLID) },
			value		: { type: new GraphQLNonNull(GraphQLString) },
			variants: { type: new GraphQLList(TestItemVariantType) },
		},
		resolve(parentValue, { id, value, variants }) {
			return TestItem.edit(id, value, variants)
		}
	},
	deleteTestItem: {
		type: TestItemType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parentValue, { id }) {
			return TestItem.deleteOne({ _id: id })
		}
	},
}
