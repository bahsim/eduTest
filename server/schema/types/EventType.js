const mongoose 	= require('mongoose')
const graphql 	= require('graphql')

const Region 			= mongoose.model('region')
const RegionType 	= require('./RegionType')

const Group 			= mongoose.model('group')
const GroupType 	= require('./GroupType')

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean,
				GraphQLList, GraphQLInt, GraphQLScalarType } = graphql

const EventType = new GraphQLObjectType({
  name:  'EventType',
  fields: () => ({
    id				: { type: GraphQLID },
    name			: { type: GraphQLString },
	  time   		: { type: GraphQLInt },
		dateStart	: { type: GraphQLString },
		dateEnd   : { type: GraphQLString },
		region: {
			type: RegionType,
			resolve(parent) {
				return Region.item({ id: parent.regionId })
			}
    },
		group: {
			type: GroupType,
			resolve(parent) {
				return Group.item({ id: parent.groupId })
			}
    },
		items: { type: new GraphQLList(EventItemType)},
  })
})

const EventItemType = new GraphQLObjectType({
  name:  'EventItemType',
  fields: () => ({
    id			: { type: GraphQLID },
    value		: { type: GraphQLString },
    variants: { type: new GraphQLList(EventVariantType) },
  })
})

const EventVariantType = new GraphQLObjectType({
	name: 'EventVariantType',
	fields: () => ({
		id		: { type: GraphQLID },
		value	: { type: GraphQLString },
		mark	: { type: GraphQLBoolean},
	})
})

module.exports = EventType
