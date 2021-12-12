const express = require('express');
const router = express.Router();
const wordCloudDataModel = require('../model/wordCloudDataModel')

router.post('/',(req,res)=>{
  const { body:data } = req;
  // console.log("data",data)
  wordCloudDataModel.findOneAndUpdate(
    { userEmail:"12345678@qq.com" },
    {
      data:data
      // $push: { data } 
    }
  ).then(() => {
    res.send({
      status: 200, 
      message: '成功上传词云图数据',
      data: []
    });
  })
})

module.exports = router;