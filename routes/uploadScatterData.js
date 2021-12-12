const express = require('express');
const router = express.Router();
const scatterDataModel = require('../model/scatterDataModel')

router.post('/',(req,res)=>{
  const { body:data } = req;
  // console.log("data",data)
  scatterDataModel.findOneAndUpdate(
    { userEmail:"12345678@qq.com" },
    {
      data:data
      // $push: { data } 
    }
  ).then(() => {
    res.send({
      status: 200, 
      message: '成功上传散点图数据',
      data: []
    });
  })
})

module.exports = router;