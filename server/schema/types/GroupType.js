const mongoose = require('mongoose')
const graphql = require('graphql')

const Region = mongoose.model('region')

const RegionType = require('./RegionType')

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
} = graphql

const GroupType = new GraphQLObjectType({
  name:  'GroupType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
		parent: {
			type: RegionType,
			resolve(parentValue) {
				return Region.findById(parentValue.regionId)
			}
    }
  })
})

module.exports = GroupType
