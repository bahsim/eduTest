const mongoose = require('mongoose')

const that = new mongoose.Schema({
  name    : { type: String },
	regionId: {
    type  : mongoose.Schema.Types.ObjectId,
    ref   : 'region',
  },
	groupId: {
    type  : mongoose.Schema.Types.ObjectId,
    ref   : 'group',
  },

})

mongoose.model('member', that)
