const mongoose = require('mongoose')

const that = new mongoose.Schema({
  name      : { type: String },
  moderator : { type: String },
  password  : { type: String },
})

mongoose.model('region', that)
