const mongoose = require('mongoose')
const Schema = mongoose.Schema

const that = new Schema({
  name      : { type: String },
  items     : { type: [{
    value   : { type: String },
    variants: { type: [{ value: String, mark: Boolean }] },
  }]},
  session   : {
    count   : { type: Number },
    interval: { type: Number },
  },
  regionId  : {
    type    : Schema.Types.ObjectId,
    ref     : 'region'
  },
  groupId   : {
    type    : Schema.Types.ObjectId,
    ref     : 'group'
  },
  dateStart : { type: Date },
  dateEnd   : { type: Date },
})

that.statics.add = (args) => {
  const Test  = mongoose.model('test')
  const { testId } = args

  Test.findById({ _id: testId })
    .then((testRecord) => {
      console.log(testRecord.name)

      const item = new model({
        name: testRecord.name
      })

      return item.save()
    })
}

that.statics.delete = ({ id }) => (
  model.deleteOne({ _id: id })
)

that.statics.findListCurrent = (args) => (
  model.find(args, null, {sort: { dateEnd: 1 }})
)

const model = mongoose.model('event', that)
