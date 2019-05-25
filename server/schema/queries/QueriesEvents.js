const mongoose 	= require('mongoose')
const graphql 	= require('graphql')

const Event 			= mongoose.model('event')
const EventType 	= require('../types/EventType')

const { GraphQLList, GraphQLID, GraphQLNonNull } = graphql

module.exports = {
	eventsCurrent: {
		type: new GraphQLList(EventType),
		args: {
			regionId: { type: GraphQLID },
			groupId	: { type: GraphQLID },
		},
		resolve(parentValue, args) {
			return Event.findListCurrent(args)
		}
	},
	event: {
		type: EventType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parentValue, args) {
			return Event.findItem(args)
		}
	},
}
