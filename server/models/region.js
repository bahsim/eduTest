const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uuidv4 = require('uuid/v4')

const RegionSchema = new Schema({
  name      : { type: String },
  moderator : { type: String },
  password  : { type: String },
})

RegionSchema.statics.add = function({ name }) {
  const Model = mongoose.model('region');

  const item = new Model({
    name			: name,
    moderator	: uuidv4(),
    password	: uuidv4().substr(0, 8)
  })

  return item.save()
}

RegionSchema.statics.edit = function({ id, name }) {
  const Model = mongoose.model('region');

  return Model.findById(id)
    .then(item => {
      item.name = name
      return item.save()
    })
}

RegionSchema.statics.editModerator = function(args) {
  const { id, moderator, password } = args
  const Model = mongoose.model('region');

  return Model.findById(id)
    .then(item => {
      item.moderator  = moderator
      item.password   = password
      return item.save()
    })
}

RegionSchema.statics.delete = function({ id }) {
  const Region  = mongoose.model('region');
  const Group   = mongoose.model('group');
  const Member  = mongoose.model('member');

	return Region.deleteOne({ _id: id })
    .then(() => {
			return Group.deleteMany({regionId: id})
				.then(() => {
					return Member.deleteMany({regionId: id})
				})
    })
}

RegionSchema.statics.findList = function() {
  const Model = mongoose.model('region');
	return Model.find({}, null, {sort: { name: 1 }})
}

RegionSchema.statics.findItem = function({ id }) {
  const Model = mongoose.model('region');
	return Model.findById(id)
}

mongoose.model('region', RegionSchema)
