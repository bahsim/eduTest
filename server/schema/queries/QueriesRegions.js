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
			return Region.list()
		}
	},
	region: {
		type: RegionType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parentValue, args) {
			return Region.item(args)
		}
	},
	regionGroups: {
		type: RegionGroupsType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parentValue, args) {
			return Region.item(args)
		}
	},
}
