const mongoose = require('mongoose')
const graphql = require('graphql')

const Group = mongoose.model('group')

const GroupType = require('../types/GroupType')

const {
	GraphQLList,
	GraphQLID,
	GraphQLNonNull,
} = graphql

module.exports = {
	groups: {
		type: new GraphQLList(GroupType),
		args: { regionId: { type: new GraphQLNonNull(GraphQLID) } },
		resolve(parentValue, { regionId }) {
			return Group.find({ regionId: regionId }, null, {sort: { name: 1 }})
		}
	},
	group: {
		type: GroupType,
		args: { id: { type: new GraphQLNonNull(GraphQLID) } },
		resolve(parentValue, { id }) {
			return Group.findById(id)
		}
	},
}
