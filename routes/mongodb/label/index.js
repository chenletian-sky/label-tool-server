const express = require('express');
const router = express.Router();
const labelModel = require('../../../model/labelModel')

router.get('/',(req,res,next) => {
  res.send("label测试用")
}) 

/**
 * @api {get} /mongo/label/all 获取全部的标签数据
 * @apiGroup label
 * @apiDescription 获取全部的标签数据
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
  labelModel.find({}).then((result) => {
    res.send({
      status:200,
      message:"获取成功",
      data:result
    })
  })
})

/**
 * @api {post} /mongo/label/insert 插入标签数据
 * @apiGroup label
 * @apiDescription 根据传入的标签数据插入标签数据
 *
 * @apiBody {String} [name]  标签的名称
 * @apiBody {String} [color] 标签的颜色
 * @apiBody {String} [key] 标签的键值
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

router.post('/insert',(req,res,next) => {
  const {body:data} = req
  labelModel.findOne({name:data.name,key:data.key}).then((result) => {
    let resData = {}
    if(result){
      resData = {
        status:403,
        message:"该标签已存在"
      }
      res.send(resData)
    }else{
      const insertObj = new labelModel({
        color:data.color,
        name:data.name,
        key:data.key
      }) 
      insertObj.save().then((result) => {
        resData ={
          status:200,
          message:"成功添加该标签",
          data:[]
        }
        res.send(resData)
      })
    }
  })
})



/**
 * @api {post} /mongo/label/update 更新标签数据
 * @apiGroup label
 * @apiDescription 根据传入的标签数据更新标签数据
 *
 * @apiBody {String} _id     标签自带的id(MongoDB)
 * @apiBody {String} [name]  标签的名称
 * @apiBody {String} [color] 标签的颜色
 * @apiBody {String} [key] 标签的键值
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
  const {body:data} = req
  labelModel.findByIdAndUpdate({
    _id:data._id
  },{
    $set:{color:data.color,name:data.name,key:data.key}
  }).then((result)=>{
    let resData = {}
    if(result){
      resData = {
        status:200,
        message:"更新标签数据成功",
        data:[]
      }
    }else{
      resData = {
        status:400,
        message:"更新标签数据失败",
        data:[]
      }
    }
    res.send(resData)
  })
})













module.exports = router;