const express = require('express');
const router = express.Router();
const textsModel = require('../model/textsModel')

router.post('/',(req, res) => {
  // req.session.name
  const { body:data } = req;
  // console.log(data)
  textsModel.findOneAndUpdate(
    { userEmail:req.session.name },
    { $push: { data: { $each: data } } }
  ).then(() => {
    res.send({
      status: 200, 
      message: '成功上传语料',
      data: []
    });
  })
})

module.exports = router;
