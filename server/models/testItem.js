const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TestItemSchema = new Schema({
  value: { type: String },
  variants: { type: [{ value: String, mark: Boolean }] },
	testId: {
    type: Schema.Types.ObjectId,
    ref: 'test'
  },
})

TestItemSchema.statics.edit = function(id, value, variants) {
  const Model = mongoose.model('testItem');

  return Model.findById(id)
    .then(item => {
      item.value    = value
      item.variants = variants
      return item.save()
    })
}

TestItemSchema.statics.delete = function(id) {
  const Modal = mongoose.model('testItem');

	return Modal.deleteOne({ _id: id })
}

mongoose.model('testItem', TestItemSchema)
