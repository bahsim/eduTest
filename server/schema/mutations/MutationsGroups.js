const graphql = require('graphql')
const mongoose = require('mongoose')

const Group = mongoose.model('group')

const GroupType = require('../types/GroupType')

const {
	GraphQLString,
	GraphQLNonNull,
	GraphQLID,
} = graphql

module.exports = {
	addGroup: {
		type: GroupType,
		args: {
			regionId: { type: new GraphQLNonNull(GraphQLString) },
			name: { type: new GraphQLNonNull(GraphQLString) }
		},
		resolve(parentValue, { regionId, name }) {
			return (new Group({ regionId, name })).save()
		}
	},
	editGroup: {
		type: GroupType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) },
			name: { type: new GraphQLNonNull(GraphQLString) },
		},
		resolve(parentValue, { id, name }) {
			return Group.edit(id, name)
		}
	},
	deleteGroup: {
		type: GroupType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parentValue, { id }) {
			return Group.delete(id)
		}
	},
}
