var express = require('express');
var router = express.Router();

const sendEmailRouter = require('./utils/sendEmail')
const testRouter = require('./utils/test')
const testModelRouter = require('./utils/testModel')
const initTestRouter = require('./utils/init_test')

const initTextWithDicRouter = require('./utils/initTextsWithDic')
const initTrainTextWithDicRouter = require('./utils/initTrainTextsWithDic')

const initTempTextsWithDicRouter = require('./utils/initTempTextsWithDic')

const initDocVecRouter = require('./utils/init_vec')

const jiaguTrainRouter = require('./utils/jiaguTrain')

const updateTempTextsRouter = require('./utils/updateTempTexts')

const uploadTestTextsRouter = require('./utils/uploadTestTexts')

router.get('/',(req,res)=>{
  res.send("api接口")
})

router.use('/sendEmail',sendEmailRouter)
router.use('/test',testRouter)
router.use('/testModel',testModelRouter)
router.use('/test_init',initTestRouter)

router.use('/initTextsWithDic',initTextWithDicRouter)
router.use('/initTrainTextWithDic',initTrainTextWithDicRouter)

router.use('/initTempTextsWithDic',initTempTextsWithDicRouter)

router.use('/jiaguTrain',jiaguTrainRouter)

router.use('/init_vec',initDocVecRouter)

router.use('/update_tempTexts',updateTempTextsRouter)

router.use('/upload_uploadTestTexts',uploadTestTextsRouter)

module.exports = router;
