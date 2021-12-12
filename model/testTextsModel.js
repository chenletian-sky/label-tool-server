const mongoose = require('./core')

const testTextsSchema = new mongoose.Schema({
  userEmail: String,
  // data: [{
  //   key: String, // index
  //   text: String,
  //   label: [{
  //     start: Number,
  //     end: Number,
  //     label: String
  //   }],
  //   textArr: [{
  //     text: String,
  //     start: Number,
  //     end: Number,
  //     label: String,
  //     color: String,
  //   }]
  // }]
  data:[]
})

module.exports = mongoose.model("testText", testTextsSchema, 'testTexts')