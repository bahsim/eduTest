const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RegionSchema = new Schema({
  name: { type: String },
})

RegionSchema.statics.edit = function(id, name) {
  const Region = mongoose.model('region');

  return Region.findById(id)
    .then(region => {
      region.name = name
      return region.save()
    })
}

mongoose.model('region', RegionSchema)
