const express = require('express');
const router = express.Router();
const xferStationsModel = require('../../../model/xferStationModel')

router.get('/',(req,res,next) => {
  res.send("xferStations测试接口")
})

/**
 * @api {get} /mongo/xferStations/all 获取中转站数据
 * @apiGroup xferStations
 * @apiDescription 获取中转站数据
 *
 * 
 * @apiSuccess {Number} status 状态码
 * @apiSuccess {String} message 描述信息
 * @apiSuccess {Object} data 返回数据
 * @apiSuccessExample  {json} success-example
 * {
 *   status:200,
 *   message:"获取中转站数据成功",
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
  xferStationsModel.findOne({
    userEmail:"12345678@qq.com"
  }).then((result) => {
    res.send({
      status:200,
      message:"获取中转站数据成功",
      data:result
    })
  })
})

/**
 * @api {delete}} /mongo/xferStations/all 删除中转站数据
 * @apiGroup xferStations
 * @apiDescription 删除中转站数据
 *
 * 
 * @apiSuccess {Number} status 状态码
 * @apiSuccess {String} message 描述信息
 * @apiSuccess {Object} data 返回数据
 * @apiSuccessExample  {json} success-example
 * {
 *   status:200,
 *   message:"删除中转站数据成功",
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
  xferStationsModel.findOneAndUpdate({
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