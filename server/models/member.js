const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MemberSchema = new Schema({
  name    : { type: String },
	regionId: {
    type  : Schema.Types.ObjectId,
    ref   : 'region',
  },
	groupId: {
    type  : Schema.Types.ObjectId,
    ref   : 'group',
  },

})

MemberSchema.statics.add = function(args) {
  const Model = mongoose.model('member');
  const item  = new Model(args)
  return item.save()
}

MemberSchema.statics.edit = function({ id, name }) {
  const Model = mongoose.model('member');

  return Model.findById(id)
    .then(item => {
      item.name = name
      return item.save()
    })
}

MemberSchema.statics.delete = function({ id }) {
  const Model = mongoose.model('member');
	return Model.deleteOne({ _id: id })
}

MemberSchema.statics.findList = function(args) {
  const Model = mongoose.model('member');
  return Model.find(args, null, {sort: { name: 1 }})
}

MemberSchema.statics.findItem = function({ id }) {
  const Model = mongoose.model('member');
  return Model.findById(id)
}

mongoose.model('member', MemberSchema)
