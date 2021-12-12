const express = require('express');
const router = express.Router();
const trainTextsModel = require('../../../model/trainTextsModel')



router.get('/', function (req, res, next) {
  res.send('trainTexts测试用')
});

/**
 * @api {post} /mongo/trainTexts/upload 上传训练数据
 * @apiGroup trainTexts
 * @apiDescription 上传训练数据
 * 
 * @apiBody {Object} [data]    训练数据
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
  trainTextsModel.findOneAndUpdate(
    {
      // userEmail:req.session.name
      userEmail:"12345678@qq.com"
    },
    { $push: { data: { $each: data } } }
  ).then((result) => {
    res.send({
      status:200,
      message:"成功上传训练数据",
      data:[]
    })
  })
})

/**
 * @api {get} /mongo/trainTexts/all 获取训练数据
 * @apiGroup trainTexts
 * @apiDescription 获取全部训练数据
 * 
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
  trainTextsModel.findOne({
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


module.exports = router;