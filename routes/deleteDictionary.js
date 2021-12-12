const express = require('express');
const router = express.Router();
const dictionaryModel = require('../model/dictionaryModel')

router.delete('/',(req, res) => {
  // console.log(req.query);
  const { _id, key } = req.query;
  dictionaryModel.updateOne(
    { userEmail:req.session.name },
    { $pull: { data: { _id, key } } }
  ).then(result => {
    res.send({
      status: 200,
      message: '删除成功',
      data: [result]
    })
  })
})

module.exports = router;
