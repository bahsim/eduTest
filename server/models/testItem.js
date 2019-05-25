const mongoose = require('mongoose')

const that = new mongoose.Schema({
  value   : { type: String },
  variants: { type: [{ value: String, mark: Boolean }] },
  testId  : {
    type  : mongoose.Schema.Types.ObjectId,
    ref   : 'test'
  },
})

mongoose.model('testItem', that)
