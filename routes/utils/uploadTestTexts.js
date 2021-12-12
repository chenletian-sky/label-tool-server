const express = require('express');
const router = express.Router();
const testTextsModel = require('../../model/testTextsModel')

router.post('/',(req, res) => {
  // req.session.name
  const { body:data } = req;
  // console.log(data)
  testTextsModel.findOneAndUpdate(
    { 
      // userEmail:req.session.name
      userEmial: "12345678@qq.com"
    },
    // { $push: { data: { $each: data } } }
    {"data":data}
  ).then(() => {
    res.send({
      status: 200, 
      message: '成功上传测试集数据',
      data: []
    });
  })
})

module.exports = router;
