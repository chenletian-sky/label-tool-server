const express = require('express');
const router = express.Router();
const trainTextsModel = require('../model/trainTextsModel')

router.delete('/',(req, res) => {
  // console.log(req.query);
  const {  key } = req.query;
  trainTextsModel.updateOne(
    { userEmail:req.session.name },
    {"data":[]}
  ).then(result => {
    // console.log("delete_trainText")
    res.send({
      status: 200,
      message: '删除成功',
      data: [result]
    })
  })
})

module.exports = router;