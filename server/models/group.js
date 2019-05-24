const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GroupSchema = new Schema({
  name    : { type: String },
	regionId: {
    type  : Schema.Types.ObjectId,
    ref   : 'region'
  },

})

GroupSchema.statics.add = function(args) {
  const Model = mongoose.model('group');
  const item  = new Model(args)
  return item.save()
}

GroupSchema.statics.edit = function({ id, name }) {
  const Model = mongoose.model('group');

  return Model.findById(id)
    .then(item => {
      item.name = name
      return item.save()
    })
}

GroupSchema.statics.delete = function({ id }) {
  const Group   = mongoose.model('group');
  const Member  = mongoose.model('member');

	return Group.deleteOne({ _id: id })
    .then(() => {
      return Member.deleteMany({groupId: id})
    })
}

GroupSchema.statics.findList = function(args) {
  const Model = mongoose.model('group');
  return Model.find(args, null, {sort: { name: 1 }})
}

GroupSchema.statics.findItem = function({ id }) {
  const Model = mongoose.model('group');
  return Model.findById(id)
}

mongoose.model('group', GroupSchema)
