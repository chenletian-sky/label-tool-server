const mongoose = require("mongoose")
const config = require("../config/config")

mongoose.connect(config.dbUrl, {
  useNewUrlParser: true
}, function (err) {
  if (err) {
    console.log("error", err)
    return
  }
  console.log("数据库连接成功")
})

module.exports = mongoose


// 模板

/**
 * @api {方法} 路径 标题
 * @apiGroup Group
 * @apiDescription 描述这个API的信息
 *
 * @apiParam {String} userName 用户名
 * @apiParamExample {json} request-example
 * {
 *  "userName": "Eve"
 * }
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