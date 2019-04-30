const mongoose = require('mongoose')
const graphql = require('graphql')

const Region = mongoose.model('region')

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
} = graphql

const RegionType = new GraphQLObjectType({
  name:  'RegionType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  })
})

module.exports = RegionType
