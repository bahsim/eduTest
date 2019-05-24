const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TestSchema = new Schema({
  name: { type: String },
})

TestSchema.statics.add = function(args) {
  const Test = mongoose.model('test');
  const item = new Test(args)
  return item.save()
}

TestSchema.statics.edit = function({ id, name }) {
  const Test = mongoose.model('test');

  return Test.findById(id)
    .then(item => {
      item.name = name
      return item.save()
    })
}

TestSchema.statics.delete = function({ id }) {
  const Test      = mongoose.model('test');
  const TestItem  = mongoose.model('testItem');

	return Test.deleteOne({ _id: id })
    .then(() => {
      return TestItem.deleteMany({testId: id})
    })
}

TestSchema.statics.findList = function() {
  const Model = mongoose.model('test');
	return Model.find({}, null, {sort: { name: 1 }})
}

TestSchema.statics.findItem = function({ id }) {
  const Model = mongoose.model('test');
	return Model.findById(id)
}

mongoose.model('test', TestSchema)
