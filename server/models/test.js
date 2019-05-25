const mongoose = require('mongoose')

const that = new mongoose.Schema({
  name: { type: String },
})

mongoose.model('test', that)
