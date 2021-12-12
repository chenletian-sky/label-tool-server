const express = require('express');
const router = express.Router();
const labelModel = require('../../../model/labelModel')

router.get('/',(req,res,next) => {
  res.send("label测试用")
}) 

router.get('/all',(req,res,next) => {
  labelModel.find({}).then((result) => {
    res.send({
      status:200,
      message:"获取成功",
      data:result
    })
  })
})

router.post('/insert',(req,res,next) => {
  const {body:data} = req
  labelModel.findOne({name:data.name,key:data.key}).then((result) => {
    let resData = {}
    if(result){
      resData = {
        status:403,
        message:"该标签已存在"
      }
      res.send(resData)
    }else{
      const insertObj = new labelModel({
        color:data.color,
        name:data.name,
        key:data.key
      }) 
      insertObj.save().then((result) => {
        resData ={
          status:200,
          message:"成功添加该标签",
          data:[]
        }
        res.send(resData)
      })
    }
  })
})













module.exports = router;