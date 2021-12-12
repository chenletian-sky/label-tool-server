const express = require('express');
const tempTextsModel = require('../../model/tempTextsModel');
const router = express.Router();

router.post('/', function (req, res, next) {
  const {body:data} = req
  tempTextsModel.findOneAndUpdate(
    {userEmail:req.session.name},
    {"data":data}
  ).then( () => {
    res.send({
      status:200,
      message:"成功更新tempTexts",
      data:[]
    })
  })
});

module.exports = router;