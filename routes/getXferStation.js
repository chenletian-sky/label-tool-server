const express = require('express');
const router = express.Router();
const xferStationModel = require('../model/xferStationModel')

router.get('/',(req, res) => {
  // req.session.name
  // const { body:data } = req;
  xferStationModel.findOne({ userEmail:req.session.name })
    .then(result => {
      res.send({
        status: 200,
        message: '获取成功',
        data: result['data']
      })
    })
})

module.exports = router;