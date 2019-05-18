const mongoose = require('mongoose')
const graphql = require('graphql')

const Member = mongoose.model('member')

const MemberType = require('../types/MemberType')

const {
	GraphQLList,
	GraphQLID,
	GraphQLNonNull,
} = graphql

module.exports = {
	members: {
		type: new GraphQLList(MemberType),
		args: { groupId: { type: new GraphQLNonNull(GraphQLID) } },
		resolve(parentValue, { groupId }) {
			return Member.find({ groupId: groupId }, null, {sort: { name: 1 }})
		}
	},
	member: {
		type: MemberType,
		args: { id: { type: new GraphQLNonNull(GraphQLID) } },
		resolve(parentValue, { id }) {
			return Member.findById(id)
		}
	},
}
