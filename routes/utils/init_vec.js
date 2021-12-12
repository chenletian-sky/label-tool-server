const express = require('express');
const router = express.Router();

const cp = require('child_process')

/* GET home page. */
router.post('/', function (req, res, next) {
  // 1. 数据库名
  // 2. 语料的表名
  // 3. 散点图数据保存的表名
  // 4. 词云数据保存的表名
  // 5. 用户的 userEmail
  
  const userEmail = req.session.name;
  // cp.exec(`"./public/python/db_sentence_vec_scatter.exe" mongoosedb texts scatterData wordCloudData ${userEmail}`,function(err,stdout){
    cp.exec(`"./public/python/db_sentence_vec_scatter.exe" mongoosedb texts scatterData wordCloudData 12345678@qq.com`,function(err,stdout){
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