const mongoose  = require('mongoose')

module.exports = {
  item: schema => schema.statics.item = item,
  list: schema => schema.statics.list = list,
  add : schema => schema.statics.add  = add,
  edit: schema => schema.statics.edit = edit,
  del : schema => schema.statics.del  = del,
}

function item ({ id }) {
  return this.findById(id)
}

function list (args, sort) {
  return this.find(args, null, sort)
}

function add (args) {
  const item = new this(args)
  return item.save()
}

function edit ({id, ...args}) {
  return this.findById(id)
    .then(item => {
      Object.keys(args).map(key => (
        item[key] = args[key]
      ))
      return item.save()
    })
}

function del ({ id }, chain) {
  return this.deleteOne({ _id: id }, async function () {
    if (chain) {
      for (let i = 0; i < chain.length; i++) {
        const model = mongoose.model(chain[i].model);
        await model.deleteMany({ [chain[i].field]: id })
      }
    }
    return true
  })
}
