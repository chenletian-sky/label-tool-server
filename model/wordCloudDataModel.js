const mongoose = require('./core')

const wordCloudDataSchema = new mongoose.Schema({
  userEmail: String,
  data:Object
})

module.exports = mongoose.model("wordCloudData", wordCloudDataSchema, 'wordCloudData')