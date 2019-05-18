const graphql = require('graphql')
const mongoose = require('mongoose')

const Test = mongoose.model('test')

const TestType = require('../types/TestType')

const {
	GraphQLString,
	GraphQLNonNull,
	GraphQLID,
} = graphql

module.exports = {
	addTest: {
		type: TestType,
		args: {
			name: { type: new GraphQLNonNull(GraphQLString) }
		},
		resolve(parentValue, { name }) {
			return (new Test({ name })).save()
		}
	},
	editTest: {
		type: TestType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) },
			name: { type: new GraphQLNonNull(GraphQLString) },
		},
		resolve(parentValue, { id, name }) {
			return Test.edit(id, name)
		}
	},
	deleteTest: {
		type: TestType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parentValue, { id }) {
			return Test.delete(id)
		}
	},
}
