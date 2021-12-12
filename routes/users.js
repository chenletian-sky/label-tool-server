var express = require('express');
var router = express.Router();
var userModel = require('../model/userModel') 

/* GET users listing. */
router.get('/', function(req, res, next) {
  // 返回 所有user(注册人员) 数据
  userModel.find({}).then(result=>{
    // console.log(result)
    res.send(result)
  })
});

module.exports = router;
