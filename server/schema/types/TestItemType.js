const mongoose = require('mongoose')
const graphql = require('graphql')

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLList,
} = graphql

const TestVariantType = require('./TestVariantType')

const TestItemType = new GraphQLObjectType({
  name:  'TestItemType',
  fields: () => ({
    id: { type: GraphQLID },
    value		: { type: GraphQLString },
    variants: { type: new GraphQLList(TestVariantType) },
  })
})

module.exports = TestItemType
