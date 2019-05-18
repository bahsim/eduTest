const mongoose = require('mongoose')
const graphql = require('graphql')

const { GraphQLObjectType } = graphql

const QueriesRegions 		= require('./queries/QueriesRegions')
const QueriesGroups 		= require('./queries/QueriesGroups')
const QueriesMembers 		= require('./queries/QueriesMembers')
const QueriesTests 			= require('./queries/QueriesTests')
const QueriesTestItems 	= require('./queries/QueriesTestItems')

module.exports = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
		...QueriesRegions,
		...QueriesGroups,
		...QueriesMembers,
		...QueriesTests,
		...QueriesTestItems,
	})
})
