const mongoose = require('mongoose')
const graphql = require('graphql')

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
} = graphql

const RegionType = new GraphQLObjectType({
  name:  'RegionType',
  fields: () => ({
    id				: { type: GraphQLID },
    name			: { type: GraphQLString },
    moderator	: { type: GraphQLString },
    password	: { type: GraphQLString },
  })
})

module.exports = RegionType
