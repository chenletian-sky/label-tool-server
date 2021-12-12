const mongoose = require('./core')

const respositySchema = new mongoose.Schema({
  name: String,
  isPrivate: Boolean,
  resposityId: {
    type: String,
    unique: true
  },
  dictionaryId: {
    type: String,
    unique: true,

  }
})

module.exports = mongoose.model("Resposity", respositySchema, 'resposities')