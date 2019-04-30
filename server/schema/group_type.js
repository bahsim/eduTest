const mongoose = require('mongoose')
const graphql = require('graphql')

const Region = mongoose.model('group')

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
  })
})

module.exports = GroupType
