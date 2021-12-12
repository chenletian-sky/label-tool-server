const express = require('express');
const router = express.Router();
const dictionaryModel = require('../model/dictionaryModel')

router.put('/',(req, res) => {
  // req.session.name
  const { body:data } = req;
  const { _id, key } = data;
  // console.log(data)
  dictionaryModel.updateOne(
    { userEmail:req.session.name, data: { $elemMatch: { _id, key } } },
    { $set: { 'data.$': data } }
  ).then(result => {
    if (result.modifiedCount !== 0) {
      res.send({
        status: 200,
        message: '更新成功',
        data: [result]
      })
    } else {
      res.send({
        status: 500,
        message: '更新失败',
        data: [result]
      })
    }
    
    
  })
})

module.exports = router;
