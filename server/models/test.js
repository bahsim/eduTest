const mongoose = require('mongoose')
const Schema = mongoose.Schema

const that = new Schema({
  name: { type: String },
})

mongoose.model('test', that)
