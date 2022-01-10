const express = require('express');
const router = express.Router();

const cp = require('child_process')

router.get('/', function (req, res, next) {
  res.send('utils测试用')
});

/**
 * @api {post} /mongo/utils/dbDictSplit 初始化字典
 * @apiGroup utils
 * @apiDescription 根据 dictKey 得到 字典数据 初始化根据textsKey得到的语料数据 得到初次标注后的数据 并保存在 中转站(xferStation)
 *
 * @apiBody {String} dictKey    字典数据的 (key)
 * @apiBody {String} textsKey   语料数据的 (key)
 * 
 * @apiSuccess {Number} status 状态码
 * @apiSuccess {String} message 描述信息
 * @apiSuccess {Object} data 返回数据
 * @apiSuccessExample  {json} success-example
 * {
 *   status:200,
 *   message:"",
 *   data:[]
 * }
 *
 * @apiError {Number} status 状态码
 * @apiError {String} message 错误信息
 * @apiError {Object} data 返回数据
 * @apiErrorExample  {json} error-example
 * {
 *   status:404,
 *   message:"",
 *   data:[]
 * }
 */

router.post('/dbDictSplit', function (req, res, next) {
  // 1. 数据库名
  // 2. 字典的表名
  // 3. 语料集的表名
  // 4. 保存结果的表名
  // 5. 用户的 userEmail
  // 6. 字典数据的 index(key)
  // 7. 语料数据的 index(key)
  const {dictKey,textsKey} = req.body
  // const userEmail = req.session.name;
  // cp.exec(`"./public/python/db_dict_split.exe" mongoosedb dictionaries texts xferStations ${userEmail}`,function(err,stdout){
    cp.exec(`"./public/python/db_dict_split.exe" mongoosedb dictionaries texts xferStations 12345678@qq.com ${dictKey} ${textsKey}`,function(err,stdout){  
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

/**
 * @api {post} /mongo/utils/jiaguTrainModel 训练数据
 * @apiGroup utils
 * @apiDescription 根据 textsKey 得到的 语料数据 和 训练集数据 训练指定的迭代次数(numberOfTrainingIterations) 得到模型训练后的数据 并保存在中转站 (xferStation)
 * 
 * @apiBody {String} textsKey   语料数据的 key
 * @apiBody {Number} numberOfTrainingIterations 训练迭代次数
 * 
 * @apiSuccess {Number} status 状态码
 * @apiSuccess {String} message 描述信息
 * @apiSuccess {Object} data 返回数据 每次自迭代的准确率
 * @apiSuccessExample  {json} success-example
 * {
 *   status:200,
 *   message:"",
 *   data:[]
 * }
 *
 * @apiError {Number} status 状态码
 * @apiError {String} message 错误信息
 * @apiError {Object} data 返回数据
 * @apiErrorExample  {json} error-example
 * {
 *   status:404,
 *   message:"",
 *   data:[]
 * }
 */

router.post('/jiaguTrainModel', function (req, res, next) {
  // 1. 数据库名
  // 2. 训练集的表名
  // 3. 语料数据的表名
  // 4. 保存结果的表名 --> ["pre":[上次的结果],"now":[此次的结果]]
  // 5. 用户的Email
  // 6. 语料集的 key
  // 7. 训练迭代的次数
  // print 每次自迭代的准确率

  const {textsKey,numberOfTrainingIterations} = req.body

  const userEmail = req.session.name;
  // cp.exec(`"./public/python/jiagu_train_model_three.exe" mongoosedb trainTexts texts xferStations ${userEmail}`,function(err,stdout){
    cp.exec(`"./public/python/jiagu_train_model.exe" mongoosedb trainTexts texts xferStations 12345678@qq.com ${textsKey} ${numberOfTrainingIterations}`,function(err,stdout){
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
        data:[stdout]
      }
      res.send(resData)
    }
  })
  // cp.on("exit",(code)=>{

  // })
});

/**
 * @api {post} /mongo/utils/dbSentenceVecScatter dec2Vec
 * @apiGroup utils
 * @apiDescription 语料数据 根据 dec2Vec 模型 得到 词云数据 散点图数据 
 * 
 * @apiBody {String} textsKey   语料数据的 key
 * @apiBody {Number} numberOfClusters   语料数据的类数
 * @apiBody {Number} sentenceVectorDimension   获取句子向量的维度
 * 
 * @apiSuccess {Number} status 状态码
 * @apiSuccess {String} message 描述信息
 * @apiSuccess {Object} data 返回数据
 * @apiSuccessExample  {json} success-example
 * {
 *   status:200,
 *   message:"",
 *   data:[]
 * }
 *
 * @apiError {Number} status 状态码
 * @apiError {String} message 错误信息
 * @apiError {Object} data 返回数据
 * @apiErrorExample  {json} error-example
 * {
 *   status:404,
 *   message:"",
 *   data:[]
 * }
 */

router.post('/dbSentenceVecScatter', function (req, res, next) {
  // 1. 数据库名
  // 2. 语料的表名
  // 3. 散点图数据保存的表名
  // 4. 词云数据保存的表名
  // 5. 聚类的类数
  // 6. 用户的 userEmail
  // 7. 获取语料数据的 key
  // 8. 获得句子向量的维度

  const {textsKey,numberOfClusters,sentenceVectorDimension} = req.body
  const userEmail = req.session.name;
  // cp.exec(`"./public/python/db_sentence_vec_scatter.exe" mongoosedb texts scatterData wordCloudData ${userEmail}`,function(err,stdout){
    cp.exec(`"./public/python/db_sentence_vec_scatter.exe" mongoosedb texts scatterData wordCloudData ${numberOfClusters} 12345678@qq.com ${textsKey} ${sentenceVectorDimension}`,function(err,stdout){
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