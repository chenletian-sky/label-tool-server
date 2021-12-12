const mongoose = require('./core')

const dictionarySchema = new mongoose.Schema({
  userEmail: String,
  dictionaries: 
    [{
      // 每个字典独有的key
      key:{type:String,unique:true},
      dictionaryName:String,
      dictionaryDescribe:String,
      // 字典数据
      data:[{
        name: String,
        label: String,
        key: String, // index
        abbreviations: [String] // 别名
      }]
    }]
})

module.exports = mongoose.model("dictionary", dictionarySchema, 'dictionaries')