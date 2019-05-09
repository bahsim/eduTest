const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TestSchema = new Schema({
  name: { type: String },
})

TestSchema.statics.edit = function(id, name) {
  const Model = mongoose.model('test');

  return Model.findById(id)
    .then(item => {
      item.name = name
      return item.save()
    })
}

TestSchema.statics.delete = function(id) {
  const Modal = mongoose.model('test');

	return Modal.deleteOne({ _id: id })
}

mongoose.model('test', TestSchema)
