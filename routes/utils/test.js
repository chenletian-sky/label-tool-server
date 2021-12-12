var express = require('express');
var router = express.Router();

const userModel = require('../../model/userModel')

/**
 * @api {get} /api/test 测试api
 * @apiVersion 0.1.0
 * @apiGroup Test
 * @apiDescription  这个api用于测试apidoc
 *
 * @apiParam {String} user 用户名
 * @apiParam {String} pwd  用户密码
 * @apiParam {String} email 用户邮箱
 * @apiParamExample {json} request-example
 * {
 *  user:"clt",
 *  email:"1111",
 *  pwd:"123456",
 * }
 *
 * @apiSuccess {Number} status 状态码 
 * @apiSuccess {String} message 错误信息
 * @apiSuccess {Object} data 返回的数据
 * @apiSuccessExample  {json} success-example
 * {
 *    status:200,
 *    message:"登陆成功",
 *    data:[]
 * }
 * 
 * 
 * @apiError {Number} status 状态码 
 * @apiError {String} message 错误信息
 * @apiError {Object} data 返回的数据
 * @apiErrorExample  {json} error-example
 * {
 *    status:404,
 *    message:"登陆失败",
 *    data:[]
 * }
 * 
 */
router.get('/', function(req, res, next) {
  const {email,pwd,name} =req.query
  // console.log("test",name,pwd)
  userModel.findOne({email}).then(result =>{
    let resData = {}
    if(result){
      if(result.pwd === pwd){
        resData = {
          status:200,
          message:"登陆成功",
          data:[]
        }
      }else{
        resData={
          status:400,
          message:"密码错误",
          data:[]
        }
      }
    }else{
      resData= {
        status:404,
        message:"查找不到该用户",
        data:[]
      }
    }
    res.send(resData)
  }).catch( err =>{
    console.log(err)
  })
});

/**
 * @api {get} /api/test/allUsers 查找所有用户
 * @apiVersion 0.1.0
 * @apiGroup Test
 * @apiDescription 查找所有已注册用户，无需发送参数
 * 
 * @apiSuccess {Number} status 状态码
 * @apiSuccess {String} message 描述信息
 * @apiSuccess {Object} data 返回数据
 * @apiSuccessExample  {json} success-example
 * {
 *   status:200,
 *   message:"获取数据成功",
 *   data:[{data}]
 * }
 *
 * @apiError {Number} status 状态码
 * @apiError {String} message 错误信息
 * @apiError {Object} data 返回数据
 * @apiErrorExample  {json} error-example
 * {
 *   status:400,
 *   message:"",
 *   data:[]
 * }
 */
router.get('/allUsers',(req,res)=>{
  userModel.find({}).then((error,result)=>{
    let resData = {}
    if(error){
      resData = {
        status:400,
        message:"获取数据失败",
        data:[]
      }
    }else{
      resData = {
        status:200,
        message:"获取数据成功",
        data:[{
          result
        }]
      }
    }
    res.send(resData)
  })
})

/**
 * @api {get} /api/test/assignUser 查找指定用户
 * @apiVersion 0.1.0
 * @apiGroup Test
 * @apiDescription 根据发送过来用户的姓名, 返回该用户的具体信息
 *
 * @apiParam {String} userName 用户名
 * @apiParamExample {json} request-example
 * {
 *  "userName": "clt"
 * }
 * 
 * @apiSuccess {Number} status 状态码
 * @apiSuccess {String} message 描述信息
 * @apiSuccess {Object} data 返回数据
 * @apiSuccessExample  {json} success-example
 * {
 *   status:200,
 *   message:"请求数据成功",
 *   data:[{data}]
 * }
 *
 * @apiError {Number} status 状态码
 * @apiError {String} message 错误信息
 * @apiError {Object} data 返回数据
 * @apiErrorExample  {json} error-example
 * {
 *   status:404,
 *   message:"无法找到该用户",
 *   data:[]
 * }
 */
router.get('/assignUser',(req,res)=>{
  const {userName} = req.query
  userModel.findOne({name:userName}).then((result)=>{
    let resData = {}
    if(result){
      resData = {
        status:200,
        message:"请求数据成功",
        data:[{
          result
        }]
      }
    }else{
      resData = {
        status:404,
        message:"无法找到该用户",
        data:[]
      }
    }
    res.send(resData)
  })
})

/**
 * @api {post} /api/test/addUser 增加用户
 * @apiVersion 0.1.0
 * @apiGroup Test
 * @apiDescription 根据发送过来的用户信息，在数据库中新增这个用户的数据
 *
 * @apiParam {String} userName 用户名
 * @apiParam {String} email 用户邮箱
 * @apiParam {String} pwd 用户密码
 * @apiParamExample {json} request-example
 * {
 *  "userName": "Eve",
 *  "email":"1234",
 *  "pwd":"123456"
 * }
 * 
 * @apiSuccess {Number} status 状态码
 * @apiSuccess {String} message 描述信息
 * @apiSuccess {Object} data 返回数据
 * @apiSuccessExample  {json} success-example
 * {
 *   status:200,
 *   message:"新建用户成功",
 *   data:[]
 * }
 *
 * @apiError {Number} status 状态码
 * @apiError {String} message 错误信息
 * @apiError {Object} data 返回数据
 * @apiErrorExample  {json} error-example
 * {
 *   status:400,
 *   message:"新建用户失败",
 *   data:[]
 * }
 */
router.post('/addUser',(req,res)=>{
  const {userName,email,pwd} = req.query
  var newUser = new userModel({
    name:userName,
    email:email,
    pwd:pwd
  })
  let resData = {}
  newUser.save(function(err,product){
    if(err){
      resData = {
        status:400,
        message:"新建用户失败",
        data:[{product}]
      }
    }else{
      resData = {
        status:200,
        message:"新建用户成功",
        data:[]
      }
    }
    res.send(resData)
  })
})

/**
 * @api {delete} /api/test/deleteUser 删除用户
 * @apiVersion 0.1.0
 * @apiGroup Test
 * @apiDescription 根据发送过来的用户邮箱(索引值),删除对应的用户数据
 *
 * @apiParam {String} email 用户邮箱
 * @apiParamExample {json} request-example
 * {
 *  "email": "123456@qq.com"
 * }
 * 
 * @apiSuccess {Number} status 状态码
 * @apiSuccess {String} message 描述信息
 * @apiSuccess {Object} data 返回数据
 * @apiSuccessExample  {json} success-example
 * {
 *   status:200,
 *   message:"删除成功",
 *   data:[]
 * }
 *
 * @apiError {Number} status 状态码
 * @apiError {String} message 错误信息
 * @apiError {Object} data 返回数据
 * @apiErrorExample  {json} error-example
 * {
 *   status:404,
 *   message:"查找不到该用户",
 *   data:[]
 * }
 * 
 * {
 *   status:400,
 *   message:"请求出错",
 *   data:[]
 * }
 */
router.delete('/deleteUser',(req,res)=>{
  const {email} = req.query
  userModel.findOneAndRemove({
    email
  },function(error,adventure){
    let resData = {}
    // console.log("delete",error,adventure)
    if(error){
      resData = {
        status:400,
        message:"请求出错",
        data:[]
      }
    }else{
      if(adventure){
        resData = {
          status:200,
          message:"删除成功",
          data:[]
        }
      }else{
        resData = {
          status: 404,
          message:"查找不到该用户",
          data:[]
        }
      }
    }
    res.send(resData)
  })
})

/**
 * @api {patch} /api/test/updateUser 更新用户数据
 * @apiVersion 0.1.0
 * @apiGroup Test
 * @apiDescription 根据发送过来的用户需要修改的信息查找，并更新数据
 *
 * @apiBody {Object} searchCharacter 是需要修改的用户的信息的键值对  
 * @apiBody {Object} updateData 是需要修改的用户的更新后的键值对
 * 
 * 
 * @apiSuccess {Number} status 状态码
 * @apiSuccess {String} message 描述信息
 * @apiSuccess {Object} data 返回数据
 * @apiSuccessExample  {json} success-example
 * {
 *   status:200,
 *   message:"数据更新成功",
 *   data:[]
 * }
 *
 * @apiError {Number} status 状态码
 * @apiError {String} message 错误信息
 * @apiError {Object} data 返回数据
 * @apiErrorExample  {json} error-example
 * {
 *   status:404,
 *   message:"数据更新失败",
 *   data:[]
 * }
 */
router.patch('/updateUser',(req,res)=>{
  const {searchCharacter,updateDate} = req.body
  // console.log({searchCharacter,updateDate})
  // res.send({searchCharacter,updateDate})
  userModel.updateOne(searchCharacter,updateDate,function(error,raw){
    let resData = {}
    if(error){
      resData = {
        status:400,
        message:"数据更新失败",
        data:[]
      }
    }else{
      resData = {
        status:200,
        message:"数据更新成功",
        data:[]
      }
    }
    res.send(resData)
  })
})

module.exports = router;
