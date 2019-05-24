const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema({
  name      : { type: String },
  items     : { type: [{
    value   : { type: String },
    variants: { type: [{ value: String, mark: Boolean }] },
  }]},
  session   : {
    count   : { type: Number },
    interval: { type: Number },
  },
  scaleSystem: {
    limit   : { type: Number },
    score   : { type: Number },
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

EventSchema.statics.add = function(args) {
  const Model = mongoose.model('event');
  const item = new Model(args)
  return item.save()
}

EventSchema.statics.delete = function({ id }) {
  const Modal = mongoose.model('event');
	return Modal.deleteOne({ _id: id })
}

mongoose.model('event', EventSchema)
