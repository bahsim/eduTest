const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TestSchema = new Schema({
  name: { type: String },
})

TestSchema.statics.edit = function(id, name) {
  const Test = mongoose.model('test');

  return Test.findById(id)
    .then(item => {
      item.name = name
      return item.save()
    })
}

TestSchema.statics.delete = function(id) {
  const Test = mongoose.model('test');
  const TestItem = mongoose.model('testItem');

	return Test.deleteOne({ _id: id })
    .then(() => {
      return TestItem.deleteMany({testId: id})
    })
}

mongoose.model('test', TestSchema)
