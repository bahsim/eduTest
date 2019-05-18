const graphql = require('graphql')
const mongoose = require('mongoose')

const Member = mongoose.model('member')

const MemberType = require('../types/MemberType')

const {
	GraphQLString,
	GraphQLNonNull,
	GraphQLID,
} = graphql

module.exports = {
	addMember: {
		type: MemberType,
		args: {
			regionId: { type: new GraphQLNonNull(GraphQLString) },
			groupId: { type: new GraphQLNonNull(GraphQLString) },
			name: { type: new GraphQLNonNull(GraphQLString) }
		},
		resolve(parentValue, { regionId, groupId, name }) {
			return (new Member({ regionId, groupId, name })).save()
		}
	},
	editMember: {
		type: MemberType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) },
			name: { type: new GraphQLNonNull(GraphQLString) },
		},
		resolve(parentValue, { id, name }) {
			return Member.edit(id, name)
		}
	},
	deleteMember: {
		type: MemberType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parentValue, { id }) {
			return Member.deleteOne({ _id: id })
		}
	},
}
