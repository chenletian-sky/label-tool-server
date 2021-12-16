const express = require('express');
const router = express.Router();
const markTextsModel = require('../../../model/markTextsModel')

router.get('/', function (req, res, next) {
  res.send("markTexts测试用")
});

/**
 * @api {post} /mongo/markTexts/upload 上传标注数据
 * @apiGroup markTexts
 * @apiDescription 上传标注数据
 *
 * @apiBody {Object} [data] 标注数据
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

router.post('/upload',(req,res,next) => {
  const {body:data} = req
  markTextsModel.findOneAndUpdate(
    {
      // userEmail:req.session.name
      userEmail:"12345678@qq.com"
    },
    { $push: { data: { $each: data } } }
  ).then((result) => {
    res.send({
      status:200,
      message:"成功上传标注数据",
      data:[]
    })
  })
})

/**
 * @api {get} /mongo/markTexts/all 获取标注数据
 * @apiGroup markTexts
 * @apiDescription 获取全部的标注数据
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

router.get('/all',(req,res,next) => {
  markTextsModel.findOne({
    userEmail:"12345678@qq.com"
    // userEmail:req.session.name
  },function(err,docs){
    let resData
    if(err){
      resData = {
        status:400,
        message:"获取数据失败",
        data:[]
      }
    }else{
      resData = {
        status:200,
        message:"获取数据成功",
        data:docs
      }
    }
    res.send(resData)
  })
  
  
})

/**
 * @api {post} /mongo/markTexts/update 更新标注数据
 * @apiGroup markTexts
 * @apiDescription 更新全部的标注数据
 *  
 * @apiBody {Object} [data] 标注数据
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

router.post('/update',(req,res,next) => {
  const {body:afterData} = req
  markTextsModel.findOneAndUpdate({
    userEmail:"12345678@qq.com"
  },
  {
    $set:{data:afterData}
  }
  ).then((result) =>{
    let resData = { }
    if(result){
      resData = {
        status:200,
        message:"更新标注数据成功",
        data:[]
      }
    }else{
      resData = {
        status:400,
        message:"更新标注数据失败",
        data:[]
      }
    }
    res.send(resData)
  })
})




module.exports = router;