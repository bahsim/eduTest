const mongoose = require('mongoose')
const graphql = require('graphql')

const Region = mongoose.model('region')

const RegionType 				= require('../types/RegionType')
const RegionGroupsType 	= require('../types/RegionGroupsType')

const {
	GraphQLList,
	GraphQLID,
	GraphQLNonNull,
} = graphql

module.exports = {
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
}
