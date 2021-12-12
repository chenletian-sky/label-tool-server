const express = require('express');
const router = express.Router();
const xferStationModel = require('../model/xferStationModel')

router.get('/',(req, res) => {
  // req.session.name
  // const { body:data } = req;
  xferStationModel.updateOne({userEmail:req.session.name},{"data":[]}).then((result)=>{
      res.send({
      status: 200,
      message: '删除成功',
      data: []
    })
  })
})

module.exports = router;