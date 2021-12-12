var express = require('express');
var router = express.Router();

const {sendEmail} = require('../../tools/sendEmail')

router.get('/', (req, res) => {
  const { email } = req.query;
  console.log(email)
  sendEmail(email).then(result => {
    console.log(result)
    res.send({
      status: 200,
      message: '发送成功',
      data: [{
        'verificationCode': result.verificationCode
      }]
    })
  }).catch(err => {
    res.send({
      status: 500,
      message: '发送失败',
      data: [{
        err
      }]
    })
  })
})


module.exports = router;
