const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

const that = new Schema({
  name      : { type: String },
  moderator : { type: String },
  password  : { type: String },
})

mongoose.model('region', that)
