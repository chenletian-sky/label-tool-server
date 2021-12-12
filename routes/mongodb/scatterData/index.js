const express = require('express');
const router = express.Router();
const scatterDataModel = require('../../../model/scatterDataModel')

router.get('/',(req,res,next) => {
  res.send("scatterData测试接口")
})

/**
 * @api {get} /mongo/scatterData/all 获取散点数据
 * @apiGroup scatterData
 * @apiDescription 获取全部的散点数据
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
  scatterDataModel.findOne({
    userEmail:"12345678@qq.com"
  }).then((result) => {
    res.send({
      status:200,
      message:"获取散点数据成功",
      data:result
    })
  })
})

/**
 * @api {delete} /mongo/scatterData/all 删除散点数据
 * @apiGroup scatterData
 * @apiDescription 删除全部的散点数据
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

router.delete('/all',(req,res,next) => {
  scatterDataModel.findOneAndUpdate({
    userEmail:"12345678@qq.com"
  },
  {
    $set:{data:{}}
  }).then((result) => {
    res.send({
      status:200,
      message:"删除数据成功",
      data:result
    })
  })
})

module.exports = router