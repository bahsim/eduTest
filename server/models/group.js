const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

const that = new Schema({
  name    : { type: String },
	regionId: {
    type  : Schema.Types.ObjectId,
    ref   : 'region'
  },
})

mongoose.model('group', that)
