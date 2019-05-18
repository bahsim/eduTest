const graphql = require('graphql')
const mongoose = require('mongoose')

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
			return (new Region({ name })).save()
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
