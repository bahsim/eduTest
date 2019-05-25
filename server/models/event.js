const mongoose = require('mongoose')

const that = new mongoose.Schema({
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
    type    : mongoose.Schema.Types.ObjectId,
    ref     : 'region'
  },
  groupId   : {
    type    : mongoose.Schema.Types.ObjectId,
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

that.statics.findListCurrent = (args) => (
  model.find(args, null, {sort: { dateEnd: 1 }})
)

const model = mongoose.model('event', that)
