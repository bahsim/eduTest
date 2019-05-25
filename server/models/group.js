const mongoose = require('mongoose')

const that = new mongoose.Schema({
  name    : { type: String },
	regionId: {
    type  : mongoose.Schema.Types.ObjectId,
    ref   : 'region'
  },
})

mongoose.model('group', that)
