const express = require('express');
const router = express.Router();
const trainTextsModel  = require('../model/trainTextsModel')

router.post('/',(req, res) => {
  // req.session.name
  // console.log(req.body)
  const { body:data } = req;
  // res.send("uploadTrainText")
  // console.log(data)
  trainTextsModel.findOneAndUpdate(
    { userEmail:req.session.name },
    { $push: { data: { $each: data } } }
  ).then(() => {
    res.send({
      status: 200, 
      message: '成功上传训练数据',
      data: []
    });
  })
})

module.exports = router;
