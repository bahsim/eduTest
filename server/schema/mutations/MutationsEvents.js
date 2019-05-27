const graphql = require('graphql')
const mongoose = require('mongoose')

const Event 		= mongoose.model('event')
const EventType	= require('../types/EventType')

const { GraphQLInputObjectType, GraphQLString, GraphQLDate,
				GraphQLNonNull, GraphQLID, GraphQLInt } = graphql

const EventSessionInputType = new GraphQLInputObjectType({
	name: 'EventSessionInputType',
	fields: {
		count : { type: GraphQLInt },
		time	: { type: GraphQLInt },
	}
})

module.exports = {
	addEvent: {
		type: EventType,
		args: {
			testId		: { type: new GraphQLNonNull(GraphQLString) },
			regionId	: { type: new GraphQLNonNull(GraphQLString) },
			groupId		: { type: new GraphQLNonNull(GraphQLString) },
			session		: { type: new GraphQLNonNull(EventSessionInputType) },
			dateStart	: { type: new GraphQLNonNull(GraphQLString) },
			dateEnd		: { type: new GraphQLNonNull(GraphQLString) },
		},
		resolve(parent, args) {
			return Event.compile(args)
		}
	},
	deleteEvent: {
		type: EventType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parent, args) {
			return Event.del(args)
			// return Event.del(args, [
			// 	{ model: 'session', field: 'eventId' }
			// ])
		}
	},
}
