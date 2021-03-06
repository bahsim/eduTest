const graphql = require('graphql')
const mongoose = require('mongoose')

const Group 		= mongoose.model('group')
const GroupType = require('../types/GroupType')

const { GraphQLString, GraphQLNonNull, GraphQLID } = graphql

module.exports = {
	addGroup: {
		type: GroupType,
		args: {
			regionId: { type: new GraphQLNonNull(GraphQLString) },
			name		: { type: new GraphQLNonNull(GraphQLString) }
		},
		resolve(parent, args) {
			return Group.add(args)
		}
	},
	editGroup: {
		type: GroupType,
		args: {
			id	: { type: new GraphQLNonNull(GraphQLID) },
			name: { type: new GraphQLNonNull(GraphQLString) },
		},
		resolve(parent, args) {
			return Group.edit(args)
		}
	},
	deleteGroup: {
		type: GroupType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parent, args) {
			return Group.del(args, [
				{ model: 'member', field: 'groupId' }
			])
		}
	},
}
