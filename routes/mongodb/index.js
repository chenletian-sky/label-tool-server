const express = require('express');
const router = express.Router();

const dictionariesRouter = require('./dictionaries/index')
const textsRouter = require('./texts/index')
const markTextsRouter = require('./markTexts/index')
const trainTextsRouter = require('./trainTexts/index')
const testTextsRouter = require('./testTexts/index')
const xferStationRouter = require('./xferStation/index')

const labelRouter = require('./label/index')
const utilsRouter = require('./utils/index')

const wordCloudDataRouter = require('./wordCloudData/index')
const scatterDataRouter = require('./scatterData/index')

router.get('/', function (req, res, next) {
  res.send('mongodb测试用')
});

router.use('/dictionaries',dictionariesRouter)
router.use('/texts',textsRouter)
router.use('/markTexts',markTextsRouter)
router.use('/trainTexts',trainTextsRouter)
router.use('/testTexts',testTextsRouter)
router.use('/label',labelRouter)

router.use('/wordCloudData',wordCloudDataRouter)
router.use('/scatterData',scatterDataRouter)
router.use('/xferStations',xferStationRouter)
router.use('/utils',utilsRouter)

module.exports = router;