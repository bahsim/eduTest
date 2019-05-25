const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

const that = new Schema({
  value   : { type: String },
  variants: { type: [{ value: String, mark: Boolean }] },
  testId  : {
    type  : Schema.Types.ObjectId,
    ref   : 'test'
  },
})

mongoose.model('testItem', that)
