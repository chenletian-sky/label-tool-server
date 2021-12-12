const express = require('express');
const router = express.Router();
const trainTextsModel = require('../model/trainTextsModel')

router.delete('/',(req, res) => {
  // console.log(req.query);
  const {  key } = req.query;
  trainTextsModel.updateOne(
    { userEmail:req.session.name },
    { $pull: { data: {  key } } }
  ).then(result => {
    // console.log("delete_trainText")
    res.send({
      status: 200,
      message: '训练集数据删除成功',
      data: [result]
    })
  })
})

module.exports = router;