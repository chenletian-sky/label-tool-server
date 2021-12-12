var express = require('express');
var router = express.Router();

const userModel = require('../../model/userModel')
const resposityModel = require('../../model/resposityModel')
const dictionaryModel = require('../../model/dictionaryModel')

router.get('/', function (req, res, next) {
  res.send("欢迎使用数据库表测试api")
});

router.get('/users', function (req, res) {
  userModel.find({}, function (error, result) {
    let resData = {}
    if (error) {
      resData = {
        status: 400,
        message: "查找失败",
        data: []
      }
    } else {
      resData = {
        status: 200,
        message: "查找成功",
        data: [{
          result
        }]
      }
    }
    res.send(resData)
  })
})

router.get('/resposities', function (req, res) {
  resposityModel.find({}, function (error, result) {
    let resData = {}
    if (error) {
      resData = {
        status: 400,
        message: "查找失败",
        data: []
      }
    } else {
      resData = {
        status: 200,
        message: "查找成功",
        data: [{
          result
        }]
      }
    }
    res.send(resData)
  })
})

router.get('/dictionaries', function (req, res) {
  dictionaryModel.find({}, function (error, result) {
    let resData = {}
    if (error) {
      resData = {
        status: 400,
        message: "查找失败",
        data: []
      }
    } else {
      resData = {
        status: 200,
        message: "查找成功",
        data: [{
          result
        }]
      }
    }
    res.send(resData)
  })
})

router.post('/user', function (req, res) {
  const {
    name,
    email,
    pwd,
    sex,
    age,
    resposityId
  } = req.body
  let newUser = new userModel({
    name,
    email,
    pwd,
    sex,
    age,
    resposityId
  })
  newUser.save(function (error, product) {
    let resData = {}
    if (error) {
      resData = {
        status: 400,
        message: "添加失败",
        data: []
      }
    } else {
      resData = {
        status: 200,
        message: "增加成功",
        data: []
      }
    }
    res.send(resData)
  })
})

router.post('/resposity', function (req, res) {
  const {
    name,isPrivate
  } = req.body
  let resposityId = new Date().getTime() + Math.random().toString(36).substr(2);
  let dictionary
  let newResposity = new resposityModel({
    name,
    isPrivate
  })
  newResposity.save(function (error, product) {
    let resData = {}
    if (error) {
      resData = {
        status: 400,
        message: "添加失败",
        data: []
      }
    } else {
      resData = {
        status: 200,
        message: "增加成功",
        data: [{
          name,isPrivate,resposityId
        }]
      }
    }
    res.send(resData)
  })
})

router.post('/dictionary', function (req, res) {
  const {
    name,
    label,
    key,
    abbreviation
  } = req.body
  let newDictionary = new dictionaryModel({
    name,
    label,
    key,
    abbreviation
  })
  newDictionary.save(function (error, product) {
    let resData = {}
    if (error) {
      resData = {
        status: 400,
        message: "添加失败",
        data: []
      }
    } else {
      resData = {
        status: 200,
        message: "增加成功",
        data: []
      }
    }
    res.send(resData)
  })
})

router.delete('/resposity', (req, res) => {
  const {name,id} = req.body

})

router.patch('/user',(req,res)=>{
  const {name,resposityIdDelete} = req.body
  userModel.findOne({name},function(error,result){
    let after =  result.resposityId.filter((obj,index)=>{
      return index+1 !== Number(resposityIdDelete)})
    result.resposityId = after
    result.save()
    res.send({
      status:200
    })
  })
})

module.exports = router;