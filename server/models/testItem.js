const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TestItemSchema = new Schema({
  value   : { type: String },
  variants: { type: [{ value: String, mark: Boolean }] },
  testId  : {
    type  : Schema.Types.ObjectId,
    ref   : 'test'
  },
})

TestItemSchema.statics.add = function(args) {
  const Model = mongoose.model('testItem');
  const item  = new Model(args)
  return item.save()
}

TestItemSchema.statics.edit = function({ id, value, variants }) {
  const Model = mongoose.model('testItem');

  return Model.findById(id)
    .then(item => {
      item.value    = value
      item.variants = variants
      return item.save()
    })
}

TestItemSchema.statics.delete = function({ id }) {
  const Modal = mongoose.model('testItem');
	return Modal.deleteOne({ _id: id })
}

TestItemSchema.statics.findList = function(args) {
  const Modal = mongoose.model('testItem');
  return Modal.find(args, null, {sort: { value: 1 }})
}

TestItemSchema.statics.findItem = function({ id }) {
  const Modal = mongoose.model('testItem');
  return Modal.findById(id)
}

mongoose.model('testItem', TestItemSchema)
