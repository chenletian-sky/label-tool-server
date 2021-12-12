const express = require('express');
const router = express.Router();

const cp = require('child_process')

/* GET home page. */
router.post('/', function (req, res, next) {
  // 1. 数据库名
  // 2. 字典的表名
  // 3. 语料数据的表名
  // 4. 保存结果的表名
  // 5. 用户的 userEmail
  // let {} = req.query
  const userEmail = req.session.name;
  cp.exec(`"./public/python/db_dict_split.exe" mongoosedb dictionaries texts xferStations ${userEmail}`,function(err,stdout){
    let resData = {}
    if(err){
      console.log("error",err)
      resData = {
        status:400,
        message:"请求失败",
        data:[]
      }
      res.send(resData)
    }else{
      console.log("调用成功")
      resData = {
        status:200,
        message:"请求成功",
        data:[]
      }
      res.send(resData)
    }
  })
  // cp.on("exit",(code)=>{

  // })
});

module.exports = router;