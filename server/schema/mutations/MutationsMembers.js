const graphql = require('graphql')
const mongoose = require('mongoose')

const Member 			= mongoose.model('member')
const MemberType 	= require('../types/MemberType')

const { GraphQLString, GraphQLNonNull, GraphQLID } = graphql

module.exports = {
	addMember: {
		type: MemberType,
		args: {
			regionId: { type: new GraphQLNonNull(GraphQLString) },
			groupId	: { type: new GraphQLNonNull(GraphQLString) },
			name		: { type: new GraphQLNonNull(GraphQLString) }
		},
		resolve(parentValue, args) {
			return Member.add(args)
		}
	},
	editMember: {
		type: MemberType,
		args: {
			id	: { type: new GraphQLNonNull(GraphQLID) },
			name: { type: new GraphQLNonNull(GraphQLString) },
		},
		resolve(parentValue, args) {
			return Member.edit(args)
		}
	},
	deleteMember: {
		type: MemberType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parentValue, args) {
			return Member.del(args)
		}
	},
}
