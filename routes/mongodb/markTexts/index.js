const express = require('express');
const router = express.Router();
const markTextsModel = require('../../../model/markTextsModel')

router.get('/', function (req, res, next) {
  res.send("markTexts测试用")
  // let insertObj = new markTextsModel({userEmail:"12345678@qq.com"})
  // insertObj.save().then( (result) => {
  //   res.send('markTexts测试用')
  // })
  
});

router.post('/upload',(req,res,next) => {
  const {body:data} = req
  markTextsModel.findOneAndUpdate(
    {
      // userEmail:req.session.name
      userEmail:"12345678@qq.com"
    },
    { $push: { data: { $each: data } } }
  ).then((result) => {
    res.send({
      status:200,
      message:"成功上传标注数据",
      data:[]
    })
  })
})

router.get('/all',(req,res,next) => {
  markTextsModel.findOne({
    userEmail:"12345678@qq.com"
    // userEmail:req.session.name
  },function(err,docs){
    let resData
    if(err){
      resData = {
        status:400,
        message:"获取数据失败",
        data:[]
      }
    }else{
      resData = {
        status:200,
        message:"获取数据成功",
        data:docs
      }
    }
    res.send(resData)
  })
  
  
})

module.exports = router;