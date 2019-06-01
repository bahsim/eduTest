const mongoose 	= require('mongoose')
const graphql 	= require('graphql')

const Event 			= mongoose.model('event')
const EventType 	= require('../types/EventType')

const { GraphQLList, GraphQLString, GraphQLID, GraphQLNonNull } = graphql

module.exports = {
	eventsCurrent: {
		type: new GraphQLList(EventType),
		args: {
			regionId	: { type: GraphQLString },
			groupId		: { type: GraphQLString },
		},
		resolve(parent, args) {
			return Event.list(
				{...args, dateEnd: { $gte: new Date() }},
				{ dateStart: 1 }
			)
		}
	},
	eventsHistory: {
		type: new GraphQLList(EventType),
		args: {
			regionId	: { type: GraphQLString },
			groupId		: { type: GraphQLString },
			dateStart	: { type: GraphQLString },
			dateEnd		: { type: GraphQLString },
		},
		resolve(parent, {dateStart, dateEnd, ...args}) {
			if (!dateStart || !dateEnd) return []

			return Event.list(
				{...args, dateStart: {
					$gte: new Date(dateStart	+ "T00:00"),
					$lte: new Date(dateEnd 		+ "T23:59"),
				}},
				{ dateStart: 1 }
			)
		}
	},
	event: {
		type: EventType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parent, args) {
			return Event.item(args)
		}
	},
}
