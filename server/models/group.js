const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GroupSchema = new Schema({
  name: { type: String },
	regionId: {
    type: Schema.Types.ObjectId,
    ref: 'region'
  },

})

GroupSchema.statics.edit = function(id, name) {
  const Model = mongoose.model('group');

  return Model.findById(id)
    .then(item => {
      item.name = name
      return item.save()
    })
}

mongoose.model('group', GroupSchema)
