const express = require('express');
const router = express.Router();
const dictionaryModel = require('../../../model/dictionaryModel')



router.get('/', function (req, res, next) {
  res.send('dictionaries测试用')
});

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
  // 传入的参数
  
  /**
   * {
   *  key: " ",
   *  data: 数据
   * }
   */

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
    res.send({
      status:200,
      message:"删除字典数据成功",
      data:[]
    })
  })

})

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

module.exports = router;