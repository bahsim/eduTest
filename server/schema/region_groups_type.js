const mongoose = require('mongoose')
const graphql = require('graphql')

const Region = mongoose.model('region')

const GroupType = require('./group_type')
const Group = mongoose.model('group')

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull,
} = graphql

const RegionGroupsType = new GraphQLObjectType({
  name:  'RegionGroupsType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    groups: {
			type: new GraphQLList(GroupType),
			resolve(parentValue, args) {
				return Group.find({ regionId: parentValue.id })
			}
    }
  })
})

module.exports = RegionGroupsType