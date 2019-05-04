const graphql = require('graphql')
const mongoose = require('mongoose')

const Region = mongoose.model('region')
const RegionType = require('./region_type')

const Group = mongoose.model('group')
const GroupType = require('./group_type')

const { 
	GraphQLObjectType, 
	GraphQLString, 
	GraphQLNonNull, 
	GraphQLID 
} = graphql

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
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
				return Region.deleteOne({ _id: id })
      }
    },
    addGroup: {
      type: GroupType,
      args: {
        regionId: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { regionId, name }) {
        return (new Group({ regionId, name })).save()
      }
    },
    editGroup: {
      type: GroupType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { id, name }) {
        return Group.edit(id, name)
      }
    },
    deleteGroup: {
      type: GroupType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { id }) {				
				return Group.deleteOne({ _id: id })
      }
    },
	}
})

module.exports = mutation
