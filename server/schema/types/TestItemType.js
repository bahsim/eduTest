const mongoose 	= require('mongoose')
const graphql 	= require('graphql')

const TestVariantType = require('./TestVariantType')

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql

module.exports = new GraphQLObjectType({
  name:  'TestItemType',
  fields: () => ({
    id			: { type: GraphQLID },
    value		: { type: GraphQLString },
    variants: { type: new GraphQLList(TestVariantType) },
  })
})
