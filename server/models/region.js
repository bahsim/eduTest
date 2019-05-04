const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RegionSchema = new Schema({
  name: { type: String },
})

RegionSchema.statics.edit = function(id, name) {
  const Model = mongoose.model('region');

  return Model.findById(id)
    .then(item => {
      item.name = name
      return item.save()
    })
}

mongoose.model('region', RegionSchema)
