const express = require('express');
const router = express.Router();
const textsModel = require('../model/textsModel')

router.delete('/',(req, res) => {
  // console.log(req.query);
  const { _id, key } = req.query;
  textsModel.updateOne(
    { userEmail:req.session.name },
    { $pull: { data: { _id, key } } }
  ).then(result => {
    res.send({
      status: 200,
      message: '语料数据删除成功',
      data: [result]
    })
  })
})

module.exports = router;
