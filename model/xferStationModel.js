const mongoose = require('./core')

const xferStationSchema = new mongoose.Schema({
  userEmail: String,
  data: Object
})

module.exports = mongoose.model("xferStation", xferStationSchema, 'xferStations')