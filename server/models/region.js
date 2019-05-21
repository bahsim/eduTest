const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RegionSchema = new Schema({
  name      : { type: String },
  moderator : { type: String },
  password  : { type: String },
})

RegionSchema.statics.edit = function(id, name) {
  const Model = mongoose.model('region');

  return Model.findById(id)
    .then(item => {
      item.name = name
      return item.save()
    })
}

RegionSchema.statics.editModerator = function(id, moderator, password) {
  const Model = mongoose.model('region');

  return Model.findById(id)
    .then(item => {
      item.moderator  = moderator
      item.password   = password
      return item.save()
    })
}

RegionSchema.statics.delete = function(id) {
  const Region = mongoose.model('region');
  const Group = mongoose.model('group');
  const Member = mongoose.model('member');

	return Region.deleteOne({ _id: id })
    .then(() => {
			return Group.deleteMany({regionId: id})
				.then(() => {
					return Member.deleteMany({regionId: id})
				})
    })
}

mongoose.model('region', RegionSchema)
