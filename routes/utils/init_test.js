const express = require('express');
const router = express.Router();

const cp = require('child_process')

/* GET home page. */
router.get('/', function (req, res, next) {
  let stdin = req.query
  cp.exec('python "./public/python/test.py"',function(err,stdout){
    if(err){
      console.log("error",err)
    }else{
      console.log("测试成功",stdout)
      res.send("测试成功")
    }
  })
  // cp.on("exit",(code)=>{

  // })
});

module.exports = router;