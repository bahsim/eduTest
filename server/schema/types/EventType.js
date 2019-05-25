const mongoose 	= require('mongoose')
const graphql 	= require('graphql')
const isISO8601 = require('validator')

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
		items			: { type: new GraphQLList(EventItemType)},
	  session   : { type: EventSessionType },
		dateStart	: { type: DateTimeType },
		dateEnd   : { type: DateTimeType },
		region: {
			type: RegionType,
			resolve(parentValue) {
				return Region.findItem(parentValue.regionId)
			}
    },
		group: {
			type: GroupType,
			resolve(parentValue) {
				return Group.findItem(parentValue.groupId)
			}
    },
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

const EventItemType = new GraphQLObjectType({
  name:  'EventItemType',
  fields: () => ({
    id			: { type: GraphQLID },
    value		: { type: GraphQLString },
    variants: { type: new GraphQLList(EventVariantType) },
  })
})

const EventSessionType = new GraphQLObjectType({
  name:  'EventSessionType',
  fields: () => ({
		count   : { type: GraphQLInt },
		interval: { type: GraphQLInt },
  })
})

const DateTimeType = new GraphQLScalarType({
	name: 'DateTime',
	serialize		: (value) => {
		if (isISO8601(value)) return value
	  throw new Error('DateTime cannot represent an invalid ISO-8601 Date string')
	},
	parseValue	: (value) => {
		if (isISO8601(value)) return value
		throw new Error('DateTime cannot represent an invalid ISO-8601 Date string')
	},
	parseLiteral: (ast) => {
		if (isISO8601(ast.value)) return ast.value
		throw new Error('DateTime cannot represent an invalid ISO-8601 Date string')
	},
})

module.exports = EventType
