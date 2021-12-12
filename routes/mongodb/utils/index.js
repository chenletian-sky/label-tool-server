const express = require('express');
const router = express.Router();

const cp = require('child_process')

router.get('/', function (req, res, next) {
  res.send('utils测试用')
});

router.post('/dbDictSplit', function (req, res, next) {
  // 1. 数据库名
  // 2. 字典的表名
  // 3. 语料集的表名
  // 4. 保存结果的表名
  // 5. 用户的 userEmail
  // 6. 字典数据的 index
  // 7. 语料数据的 index
  
  // const userEmail = req.session.name;
  // cp.exec(`"./public/python/db_dict_split.exe" mongoosedb dictionaries texts xferStations ${userEmail}`,function(err,stdout){
    cp.exec(`"./public/python/db_dict_split.exe" mongoosedb dictionaries texts xferStations 12345678@qq.com 1 1`,function(err,stdout){  
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
});

router.post('/jiaguTrainModel', function (req, res, next) {
  // 1. 数据库名
  // 2. 训练集的表名
  // 3. 语料数据的表名
  // 4. 保存结果的表名 --> ["pre":[上次的结果],"now":[此次的结果]]
  // 5. 测试集 的表名
  // 6. 用户的 userEmail
  // 7. 语料集的 key

  const userEmail = req.session.name;
  // cp.exec(`"./public/python/jiagu_train_model_three.exe" mongoosedb trainTexts texts xferStations ${userEmail}`,function(err,stdout){
    cp.exec(`"./public/python/jiagu_train_model.exe" mongoosedb trainTexts texts xferStations trainTexts 12345678@qq.com 11`,function(err,stdout){
    let resData = {}
    if(err){
      console.log("error",err)
      resData = {
        status:400,
        message:"请求失败",
        data:[err]
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

router.post('/dbSentenceVecScatter', function (req, res, next) {
  // 1. 数据库名
  // 2. 语料的表名
  // 3. 散点图数据保存的表名
  // 4. 词云数据保存的表名
  // 5. 聚类的类数
  // 6. 用户的 userEmail
  // 7. 获取语料数据的 index


  const userEmail = req.session.name;
  // cp.exec(`"./public/python/db_sentence_vec_scatter.exe" mongoosedb texts scatterData wordCloudData ${userEmail}`,function(err,stdout){
    cp.exec(`"./public/python/db_sentence_vec_scatter.exe" mongoosedb texts scatterData wordCloudData 10 12345678@qq.com 1`,function(err,stdout){
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