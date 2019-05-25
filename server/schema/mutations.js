const graphql = require('graphql')
const mongoose = require('mongoose')

const { GraphQLObjectType } = graphql

const MutationsRegions 		= require('./mutations/MutationsRegions')
const MutationsGroups 		= require('./mutations/MutationsGroups')
const MutationsMembers 		= require('./mutations/MutationsMembers')
const MutationsTests 			= require('./mutations/MutationsTests')
const MutationsTestItems 	= require('./mutations/MutationsTestItems')
const MutationsEvents     = require('./mutations/MutationsEvents')

module.exports = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...MutationsRegions,
		...MutationsGroups,
		...MutationsMembers,
		...MutationsTests,
		...MutationsTestItems,
		...MutationsEvents,
  })
})
