const graphql = require('graphql')
const { GraphQLSchema } = graphql

const Queries    = require('./queries')
const Mutations  = require('./mutations')

module.exports = new GraphQLSchema({
  query     : Queries,
  mutation  : Mutations
})
