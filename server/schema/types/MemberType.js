const mongoose 	= require('mongoose')
const graphql 	= require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql

module.exports = new GraphQLObjectType({
  name:  'MemberType',
  fields: () => ({
    id	: { type: GraphQLID },
    name: { type: GraphQLString },
  })
})
