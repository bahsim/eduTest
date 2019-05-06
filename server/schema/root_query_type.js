const mongoose = require('mongoose')
const graphql = require('graphql')

const RegionType = require('./region_type')
const RegionGroupsType = require('./region_groups_type')
const Region = mongoose.model('region')

const GroupType = require('./group_type')
const Group = mongoose.model('group')

const MemberType = require('./member_type')
const Member = mongoose.model('member')

const { 
	GraphQLObjectType, 
	GraphQLList, 
	GraphQLID, 
	GraphQLNonNull, 
} = graphql

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
		regions: {
			type: new GraphQLList(RegionType),
			resolve() {
				return Region.find({}, null, {sort: { name: 1 }})
			}
		},
		region: {
			type: RegionType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(parentValue, { id }) {
				return Region.findById(id)
			}
		},
		regionGroups: {
			type: RegionGroupsType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(parentValue, { id }) {
				return Region.findById(id)
			}
		},
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
	})
})

module.exports = RootQuery
