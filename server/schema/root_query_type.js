const mongoose = require('mongoose')
const graphql = require('graphql')

const RegionType = require('./region_type')
const Region = mongoose.model('region')

const GroupType = require('./group_type')
const Group = mongoose.model('group')

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
				return Region.find({})
			}
		},
		region: {
			type: RegionType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(parentValue, { id }) {
				return Region.findById(id)
			}
		},
		groups: {
			type: new GraphQLList(GroupType),
			args: { regionId: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(parentValue, { regionId }) {
				return Group.find({ regionId: regionId })
			}
		},
		group: {
			type: GroupType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(parentValue, { id }) {
				return Group.findById(id)
			}
		},
	})
})

module.exports = RootQuery
