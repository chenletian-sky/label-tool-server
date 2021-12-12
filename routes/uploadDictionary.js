const express = require('express');
const router = express.Router();
const dictionaryModel = require('../model/dictionaryModel')

router.post('/',(req, res) => {
  // req.session.name
  const { body:data } = req;
  dictionaryModel.findOneAndUpdate(
    { userEmail:req.session.name },
    { $push: { data: { $each: data } } }
  ).then(() => {
    res.send({
      status: 200, 
      message: '成功上传字典',
      data: []
    });
  })
})

module.exports = router;
