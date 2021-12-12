const express = require('express');
const router = express.Router();
const testTextsModel = require('../../../model/testTextsModel')

router.get('/',(req,res,next) => {
  res.send("testTexts测试接口")
})

/**
 * @api {get} /mongo/testTexts/all 获取测试集数据
 * @apiGroup testTexts
 * @apiDescription 获取全部的测试集数据
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
  testTextsModel.find({}).then((result) => {
    res.send({
      status:200,
      message:"成功获取数据",
      data:result
    })
  })
})


module.exports = router