const mongoose = require('./core')

const scatterDataSchema = new mongoose.Schema({
  userEmail: String,
  data:Object
})

module.exports = mongoose.model("scatterData", scatterDataSchema, 'scatterData')