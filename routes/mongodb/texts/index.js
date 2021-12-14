const express = require('express');
const dictionaryModel = require('../../../model/dictionaryModel');
const router = express.Router();
const textsModel = require('../../../model/textsModel')

router.get('/', function (req, res, next) {
  res.send('texts测试用')
});

/**
 * @api {post} /mongo/texts/upload 上传语料数据
 * @apiGroup texts
 * @apiDescription 上传语料数据
 *
 * @apiBody {Array} Data 语料数据
 * 
 * @apiSuccess {Number} status 状态码
 * @apiSuccess {String} message 描述信息
 * @apiSuccess {Object} data 返回数据
 * @apiSuccessExample  {json} success-example
 * {
 *   status:200,
 *   message:"上传语料数据成功",
 *   data:[]
 * }
 *
 * @apiError {Number} status 状态码
 * @apiError {String} message 错误信息
 * @apiError {Object} data 返回数据
 * @apiErrorExample  {json} error-example
 * {
 *   status:404,
 *   message:"上传语料数据失败",
 *   data:[]
 * }
 */

router.post('/upload',(req, res) => {
  // req.session.name
  const { body:data } = req;
  // console.log(data)
  textsModel.findOneAndUpdate(
    // { userEmail:req.session.name },
    {userEmail:"12345678@qq.com"},
    { 
      $push: {
        "texts":data  
      } 
    }
  ).then(() => {
    res.send({
      status: 200, 
      message: '成功上传语料',
      data: []
    });
  })
})

/**
 * @api {get} /mongo/texts/all 获取语料数据
 * @apiGroup texts
 * @apiDescription 获取全部语料数据
 *
 * 
 * @apiSuccess {Number} status 状态码
 * @apiSuccess {String} message 描述信息
 * @apiSuccess {Object} data 返回数据
 * @apiSuccessExample  {json} success-example
 * {
 *   status:200,
 *   message:"获取语料数据成功",
 *   data:[]
 * }
 *
 * @apiError {Number} status 状态码
 * @apiError {String} message 错误信息
 * @apiError {Object} data 返回数据
 * @apiErrorExample  {json} error-example
 * {
 *   status:404,
 *   message:"获取语料数据失败",
 *   data:[]
 * }
 */

router.get('/all',(req,res,next) => {
  textsModel.findOne({
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
 * @api {post} /mongo/texts/insert 插入语料数据
 * @apiGroup texts
 * @apiDescription 根据 key 在指定的语料数据集中插入新的语料数据 
 *
 * @apiBody {String} key 语料数据 key
 * @apiBody {Object} data 要插入的语料数据
 * 
 * @apiSuccess {Number} status 状态码
 * @apiSuccess {String} message 描述信息
 * @apiSuccess {Object} data 返回数据
 * @apiSuccessExample  {json} success-example
 * {
 *   status:200,
 *   message:"插入语料数据成功",
 *   data:[]
 * }
 *
 * @apiError {Number} status 状态码
 * @apiError {String} message 错误信息
 * @apiError {Object} data 返回数据
 * @apiErrorExample  {json} error-example
 * {
 *   status:404,
 *   message:"插入语料数据失败",
 *   data:[]
 * }
 */

router.post('/insert',(req,res,next) => {
  const { body:data} = req
  textsModel.findOneAndUpdate({
    userEmail:"12345678@qq.com"
    // "texts.key":data.key
  },
  {
    $push:{
      "texts.$[i].data":data.data
    }
  },{
    arrayFilters:[
      {
        "i.key":data.key
      }
    ]
  }).then(result => {
    // result
    res.send({
      status:200,
      message:"",
      data:result
    })
  })
})

/**
 * @api {delete} /mongo/texts/delete 删除语料数据
 * @apiGroup texts
 * @apiDescription 根据 key 在指定的语料数据集中删除已有的语料数据 
 *
 * @apiBody {String} textKey 语料数据 key
 * @apiBody {String} dataKey 数据索引 key
 * 
 * @apiSuccess {Number} status 状态码
 * @apiSuccess {String} message 描述信息
 * @apiSuccess {Object} data 返回数据
 * @apiSuccessExample  {json} success-example
 * {
 *   status:200,
 *   message:"删除语料数据成功",
 *   data:[]
 * }
 *
 * @apiError {Number} status 状态码
 * @apiError {String} message 错误信息
 * @apiError {Object} data 返回数据
 * @apiErrorExample  {json} error-example
 * {
 *   status:404,
 *   message:"删除语料数据失败",
 *   data:[]
 * }
 */

router.delete('/delete',(req,res,next) => {
  const {body:data} = req
  /***
   * {
   *  textKey:
   *  dataKey:
   * }
   */
  
  textsModel.findOneAndUpdate(
    {
      userEmail:"12345678@qq.com"
    },
    {
      $pull:{
        "texts.$[i].data":{key:data.dataKey}
        // "texts.$[i].data.key":data.dataKey
      }
    },
    {
      arrayFilters:[
        {
          "i.key":data.textKey
        }
      ]
    }
  ).then((result) => {
    res.send({
      status:200,
      message:"删除成功",
      data:[]
    })
  })

})

/**
 * @api {post} /mongo/texts/update 更新语料数据
 * @apiGroup texts
 * @apiDescription 根据 key 在指定的语料数据集中更新已有的语料数据 
 *
 * @apiBody {String} textKey 语料数据 key
 * @apiBody {String} dataKey 数据索引 key
 * @apiBody {Object} data    更新的数据
 * 
 * @apiSuccess {Number} status 状态码
 * @apiSuccess {String} message 描述信息
 * @apiSuccess {Object} data 返回数据
 * @apiSuccessExample  {json} success-example
 * {
 *   status:200,
 *   message:"更新语料数据成功",
 *   data:[]
 * }
 *
 * @apiError {Number} status 状态码
 * @apiError {String} message 错误信息
 * @apiError {Object} data 返回数据
 * @apiErrorExample  {json} error-example
 * {
 *   status:404,
 *   message:"更新语料数据失败",
 *   data:[]
 * }
 */

router.post('/update',(req,res,next) => {
  const {body:data} = req
  textsModel.findOneAndUpdate(
  {
    userEmail:"12345678@qq.com"
    // userEmail:req.session.name
  },
  {
    $set:{
      //  第一个 key
      "texts.$[i].data.$[j]":data.data
    }
  },
  {
    arrayFilters:[
      {
        "i.key":data.textKey
      },
      {
        "j.key":data.dataKey
      }
    ]
  }).then((result) => {
    res.send({
      status:200,
      message:"修改语料数据成功",
      data:[]
    })
  })
})




module.exports = router;