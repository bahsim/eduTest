const graphql = require('graphql')
const mongoose = require('mongoose')

const Event 		= mongoose.model('event')
const EventType	= require('../types/EventType')

const { GraphQLInputObjectType, GraphQLString, GraphQLNonNull, GraphQLID,
				GraphQLList, GraphQLBoolean } = graphql

module.exports = {
	addEvent: {
		type: EventType,
		args: {
			testId	: { type: new GraphQLNonNull(GraphQLString) },
		},
		resolve(parentValue, args) {
			return Event.add(args)
		}
	},
	deleteEvent: {
		type: EventType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parentValue, args) {
			return Event.del(args)
		}
	},
}
