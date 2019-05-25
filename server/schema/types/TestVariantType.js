const mongoose 	= require('mongoose')
const graphql 	= require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = graphql

module.exports = new GraphQLObjectType({
	name: 'VariantType',
	fields: () => ({
		value	: { type: GraphQLString },
		mark	: { type: GraphQLBoolean},
	})
})
