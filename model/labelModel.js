const mongoose = require('./core')

const labelSchema = new mongoose.Schema({
  color: String,
  name: String,
  key: String
})

module.exports = mongoose.model("label", labelSchema, 'labels')