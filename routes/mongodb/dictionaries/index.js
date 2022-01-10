const express = require('express');
const router = express.Router();
const dictionaryModel = require('../../../model/dictionaryModel')



router.get('/', function (req, res, next) {
  res.send('dictionaries测试用')
});

/**
 * @api {post} /mongo/dictionaries/upload 上传字典数据
 * @apiGroup dictionaries
 * @apiDescription 上传字典数据
 *
 * @apiBody {Object} [data] 字典数据
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

router.post('/upload',(req, res) => {
  // req.session.name
  const { body:data } = req;
  // console.log(data)
  dictionaryModel.findOneAndUpdate(
    // { userEmail:req.session.name },
    {userEmail:"12345678@qq.com"},
    { 
      $push:{
        "dictionaries":data
      }
    }
  ).then(() => {
    res.send({
      status: 200, 
      message: '成功上传字典',
      data: []
    });
  })
})

/**
 * @api {get} /mongo/dictionaries/all 获取全部字典数据
 * @apiGroup dictionaries
 * @apiDescription 获取全部字典数据
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
  dictionaryModel.findOne({
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
 * @api {post} /mongo/dictionaries/insert 插入字典数据
 * @apiGroup dictionaries
 * @apiDescription 插入字典数据
 *
 * @apiBody {String} key 字典索引
 * @apiBody {Object} data 字典数据
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

/**
 * {
    "key":"1213",
    "data":
    {
        "name": "testtest",
        "label": "EQU",
        "key": "4m98m4cwuqy0000",
        "abbreviations": []
    }   
}
 */

router.post('/insert',(req,res,next) => {
  const { body:data} = req
  dictionaryModel.findOneAndUpdate({
    userEmail:"12345678@qq.com"
    // "texts.key":data.key
  },
  {
    $push:{
      "dictionaries.$[i].data":data.data
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
      message:"插入字典数据成功",
      data:result
    })
  })
})

/**
 * @api {delete} /mongo/dictionaries/delete 删除字典数据
 * @apiGroup dictionaries
 * @apiDescription 根据传入的 dictKey(字典索引) dataKey(数据索引) 删除指定的字典数据
 *
 * @apiBody {String} dictKey 字典索引
 * @apiBody {String} dataKey 数据索引
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

/**
 * {
    "dictKey":"13",
    "dataKey":"50ucbplyw1k0000"
}
 */

router.delete('/delete',(req,res,next) => {
  const {body:data} = req
  /***
   * {
   *  textKey:
   *  dataKey:
   * }
   */
  
  dictionaryModel.findOneAndUpdate(
    {
      userEmail:"12345678@qq.com"
    },
    {
      $pull:{
        "dictionaries.$[i].data":{key:data.dataKey}
        // "texts.$[i].data.key":data.dataKey
      }
    },
    {
      arrayFilters:[
        {
          "i.key":data.dictKey
        }
      ]
    }
  ).then((result) => {
    console.log(result)
    res.send({
      status:200,
      message:"删除字典数据成功",
      data:[]
    })
  })

})

/**
 * @api {post} /mongo/dictionaries/update 更新字典数据
 * @apiGroup dictionaries
 * @apiDescription 更新字典数据
 *
 * @apiBody {String} dictKey 字典索引
 * @apiBody {String} dataKey 数据索引
 * @apiBody {Object} data 待更新的字典数据
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

/**
 * {
    "dictKey":"1213",
    "dataKey":"50ucbplyw1k0000",
    "data":
    {
        "name": "testtesttest",
        "label": "test",
        "key": "test",
        "abbreviations": []
    }
}
 */

router.post('/update',(req,res,next) => {
  const {body:data} = req
  dictionaryModel.findOneAndUpdate(
  {
    userEmail:"12345678@qq.com"
    // userEmail:req.session.name
  },
  {
    $set:{
      //  第一个 key
      "dictionaries.$[i].data.$[j]":data.data
    }
  },
  {
    arrayFilters:[
      {
        "i.key":data.dictKey
      },
      {
        "j.key":data.dataKey
      }
    ]
  }).then((result) => {
    res.send({
      status:200,
      message:"修改字典数据成功",
      data:[]
    })
  })
})

const fs = require("fs");
var { execFile } = require('child_process');
router.post('/transPdf',(req,res,next)=>{
  const {body:{data}} = req
  const buf = Buffer.from(data, 'binary')
  fs.writeFileSync(String.raw`C:\Users\Administrator\Desktop\label-tool-server\my_pdf.pdf`, buf);
  // console.log(data)
  const ocrPath = String.raw`C:\Users\Administrator\Desktop\label-tool-server\ocr`;
  var as = execFile(`${ocrPath}\\ocr.exe`, [String.raw`C:\Users\Administrator\Desktop\label-tool-server\my_pdf.pdf`], (err,stdout) => {
    if(err) {
            console.log(err);
            return;
    } 
    else{
        console.log("test success");

        //由于进程问题所以放在运行execFile的后面
        fs.readFile(`${ocrPath}\\result\result.txt`, 'utf-8', (err, data) => {
            // console.log(data)
            const sns = data.split("\n")
            // console.log(sns);
            const my_data = []
            sns.forEach((element, i) => {
                const item = element.replace("\r","")
                my_data.push(item.replace("\t",""));
            })
            // console.log(my_data);
            res.send({
              status:200,
              message:"sucess",
              data:my_data
          })
        });
    
        // res.writeHead(200, {
        //     'Access-Control-Allow-Credentials': 'true',     // 后端允许发送Cookie
        //     'Access-Control-Allow-Origin': '*',    // 允许访问的域（协议+域名+端口）
        //     'Set-Cookie': 'l=a123456;Path=/;Domain=www.domain2.com;HttpOnly'  // HttpOnly的作用是让js无法读取cookie
        // });
        // res.write("ssss");
        // res.end();
    }
  });
  as.on('exit', (code) => {
      console.log("退出")
  })
  
})

module.exports = router;