const mongoose 	= require('mongoose')
const graphql 	= require('graphql')

const Region 		= mongoose.model('region')
const Group 		= mongoose.model('group')
const GroupType = require('./GroupType')

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql

module.exports = new GraphQLObjectType({
  name:  'RegionGroupsType',
  fields: () => ({
    id	: { type: GraphQLID },
    name: { type: GraphQLString },
    list: {
			type: new GraphQLList(GroupType),
			resolve(parentValue) {
				return Group.list({ regionId: parentValue.id }, { name: 1 })
			}
    }
  })
})
