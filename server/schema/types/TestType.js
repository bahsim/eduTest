const mongoose 	= require('mongoose')
const graphql 	= require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql

module.exports = new GraphQLObjectType({
  name:  'TestType',
  fields: () => ({
    id	: { type: GraphQLID },
    name: { type: GraphQLString },
  })
})
