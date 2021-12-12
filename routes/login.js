var express = require('express');
var router = express.Router();
var userModel = require('../model/userModel')

router.get('/',(req, res) => {
  const { email, pwd } = req.query;
  userModel.findOne({ email })
    .then(result => {
      // console.log(result)
      let resData = {}
      if (result) {
        if (result.pwd === pwd) {
          // 设置验证 
          req.session.name = result.email
          // console.log('cookie:', req.cookies)
          resData = {
            status: 200,
            message: '登录成功',
            data: []
          }
        } else {
          resData = {
            status: 400,
            message: '密码错误',
            data: []
          }
        }
      } else {
        resData = {
          status: 404,
          message: '该用户不存在',
          data: []
        }
      }
      res.send(resData)
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = router;
