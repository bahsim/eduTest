const mongoose = require('mongoose')

const that = new mongoose.Schema({
  name      : { type: String },
  session   : {
    count   : { type: Number },
    time    : { type: Number },
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
  items     : { type: [{
    value   : { type: String },
    variants: { type: [{ value: String, mark: Boolean }] },
  }]},
})

// that.statics.listCurrent = (args, sort) => {
//   return model.find({...args, dateEnd: { $gte: new Date() }}, null, sort)
//   // const now = new Date()
//   // return model.find({...args, dateStart: {$lte: now}, dateEnd: {$gte: now}}, null, sort)
// }

that.statics.compile = async (args) => {
  const { testId, regionId, groupId, session, dateStart, dateEnd } = args

  const Test  = mongoose.model('test')
  const testRecord = await Test.item({ id: testId })

  const TestItems = mongoose.model('testItem')
  const testItemsRecords = await TestItems.list({ testId })

  const item = new model({
    name      : testRecord.name,
    items     : testItemsRecords,
    session   : session,
    regionId  : regionId,
    groupId   : groupId,
    dateStart : dateStart,
    dateEnd   : dateEnd,
  })

  return item.save()
}

const model = mongoose.model('event', that)
