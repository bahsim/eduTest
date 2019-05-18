const mongoose = require('mongoose')
const graphql = require('graphql')

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
} = graphql

const MemberType = new GraphQLObjectType({
  name:  'MemberType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  })
})

module.exports = MemberType
