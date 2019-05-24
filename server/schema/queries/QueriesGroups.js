const mongoose = require('mongoose')
const graphql = require('graphql')

const Group 		= mongoose.model('group')
const GroupType = require('../types/GroupType')

const { GraphQLList, GraphQLID, GraphQLNonNull } = graphql

module.exports = {
	groups: {
		type: new GraphQLList(GroupType),
		args: {
			regionId: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parentValue, args) {
			return Group.findList(args)
		}
	},
	group: {
		type: GroupType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parentValue, args) {
			return Group.findItem(args)
		}
	},
}
