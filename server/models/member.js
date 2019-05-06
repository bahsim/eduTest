const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MemberSchema = new Schema({
  name: { type: String },
	regionId: {
    type: Schema.Types.ObjectId,
    ref: 'region',
  },
	groupId: {
    type: Schema.Types.ObjectId,
    ref: 'group',
  },

})

MemberSchema.statics.edit = function(id, name) {
  const Model = mongoose.model('member');

  return Model.findById(id)
    .then(item => {
      item.name = name
      return item.save()
    })
}

mongoose.model('member', MemberSchema)
