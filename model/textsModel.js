const mongoose = require('./core')

const textsSchema = new mongoose.Schema({
  userEmail: String,
  texts: 
    [{
      // 每个语料数据的 key
      key:{type:String,unique:true},
      textsName:String,
      textsDescribe:String,
      // 语料数据
      data:[{
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
    }]

})

module.exports = mongoose.model("text", textsSchema, 'texts')