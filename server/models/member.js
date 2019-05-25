const mongoose = require('mongoose')
const Schema = mongoose.Schema

const that = new Schema({
  name    : { type: String },
	regionId: {
    type  : Schema.Types.ObjectId,
    ref   : 'region',
  },
	groupId: {
    type  : Schema.Types.ObjectId,
    ref   : 'group',
  },

})

mongoose.model('member', that)
