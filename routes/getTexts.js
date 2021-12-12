const express = require('express');
const router = express.Router();
const textsModel = require('../model/textsModel')

router.get('/',(req, res) => {
  // req.session.name
  // const { body:data } = req;
  textsModel.findOne({ userEmail:req.session.name })
    .then(result => {
      res.send({
        status: 200,
        message: '获取成功',
        data: result['data']
      })
    })
})

module.exports = router;
