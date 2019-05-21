const graphql = require('graphql')
const mongoose = require('mongoose')
const uuidv4 = require('uuid/v4')

const Region = mongoose.model('region')

const RegionType = require('../types/RegionType')

const {
	GraphQLString,
	GraphQLNonNull,
	GraphQLID,
} = graphql

module.exports = {
	addRegion: {
		type: RegionType,
		args: {
			name: { type: new GraphQLNonNull(GraphQLString) }
		},
		resolve(parentValue, { name }) {
			return (new Region({
				name			: name,
				moderator	: uuidv4(),
				password	: uuidv4().substr(0, 8)
			})).save()
		}
	},
	editRegion: {
		type: RegionType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) },
			name: { type: new GraphQLNonNull(GraphQLString) },
		},
		resolve(parentValue, { id, name }) {
			return Region.edit(id, name)
		}
	},
	editModerator: {
		type: RegionType,
		args: {
			id				: { type: new GraphQLNonNull(GraphQLID) },
			moderator	: { type: new GraphQLNonNull(GraphQLString) },
			password	: { type: new GraphQLNonNull(GraphQLString) },
		},
		resolve(parentValue, { id, moderator, password }) {
			return Region.editModerator(id, moderator, password)
		}
	},
	deleteRegion: {
		type: RegionType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parentValue, { id }) {
			return Region.delete(id)
		}
	},
}
