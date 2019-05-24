const mongoose = require('mongoose')
const graphql = require('graphql')

const Region 						= mongoose.model('region')
const RegionType 				= require('../types/RegionType')
const RegionGroupsType 	= require('../types/RegionGroupsType')

const { GraphQLList, GraphQLID, GraphQLNonNull } = graphql

module.exports = {
	regions: {
		type: new GraphQLList(RegionType),
		resolve() {
			return Region.findList()
		}
	},
	region: {
		type: RegionType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parentValue, args) {
			return Region.findItem(args)
		}
	},
	regionGroups: {
		type: RegionGroupsType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parentValue, args) {
			return Region.findItem(args)
		}
	},
}
