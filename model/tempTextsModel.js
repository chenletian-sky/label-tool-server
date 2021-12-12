const mongoose = require('./core')

const tempTextsSchema = new mongoose.Schema({
  userEmail: String,
  data: [{
    key: String, // index
    text: String,
    label: [{
      start: Number,
      end: Number,
      label: String
    }],
    textArr: [{
      text: String,
      start: Number,
      end: Number,
      label: String,
      color: String,
    }]
  }]
})

module.exports = mongoose.model("tempText", tempTextsSchema, 'tempTexts')