const graphql 	= require('graphql')
const mongoose 	= require('mongoose')
const uuidv4 		= require('uuid/v4')

const Region 			= mongoose.model('region')
const RegionType 	= require('../types/RegionType')

const { GraphQLString, GraphQLNonNull, GraphQLID } = graphql

module.exports = {
	addRegion: {
		type: RegionType,
		args: {
			name: { type: new GraphQLNonNull(GraphQLString) }
		},
		resolve(parentValue, args) {
			return Region.add({
				name			: args.name,
		    moderator	: uuidv4(),
		    password	: uuidv4().substr(0, 8)
			})
		}
	},
	editRegion: {
		type: RegionType,
		args: {
			id	: { type: new GraphQLNonNull(GraphQLID) },
			name: { type: new GraphQLNonNull(GraphQLString) },
		},
		resolve(parentValue, args) {
			return Region.edit(args)
		}
	},
	editModerator: {
		type: RegionType,
		args: {
			id				: { type: new GraphQLNonNull(GraphQLID) },
			moderator	: { type: new GraphQLNonNull(GraphQLString) },
			password	: { type: new GraphQLNonNull(GraphQLString) },
		},
		resolve(parentValue, args) {
			return Region.edit(args)
		}
	},
	deleteRegion: {
		type: RegionType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parentValue, args) {
			return Region.del(args, [
				{ model: 'group', 	field: 'regionId' },
				{ model: 'member', 	field: 'regionId' },
			])
		}
	},
}
