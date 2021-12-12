const express = require('express');
const router = express.Router();
const textsModel = require('../model/textsModel')

router.post('/',(req, res) => {
  // req.session.name
  const { body:data } = req;
  // console.log(data)
  textsModel.findOneAndUpdate(
    { userEmail:req.session.name },
    {"data":data}
  ).then(() => {
    res.send({
      status: 200, 
      message: '成功更新语料',
      data: []
    });
  })
})

module.exports = router;
