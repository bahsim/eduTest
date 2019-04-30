const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RegionSchema = new Schema({
  name: { type: String },
})

mongoose.model('region', RegionSchema)
