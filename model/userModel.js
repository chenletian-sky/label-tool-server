const mongoose = require('./core')

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  pwd: String,
  sex: {
    type: String,
    default: null
  },
  age: {
    type: Number,
    default: null
  },
  // resposities:Array<{resposityId: String}>
  // resposityId: [String]

})

module.exports = mongoose.model("User", userSchema, 'users')