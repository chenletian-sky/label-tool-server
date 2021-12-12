const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// 引入 cors 解决跨域问题
const cors = require('cors');
// 引入 session
const session = require("express-session")
const bodyParser=require('body-parser');



// var bodyParser = require('body-parser');



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')
const apiRouter = require('./routes/api')

const uploadDictionaryRouter = require('./routes/uploadDictionary')
const getDictionaryRouter = require('./routes/getDictionary')
const updateDictionaryRouter = require('./routes/updateDictionary')
const deleteDictionaryRouter = require('./routes/deleteDictionary')

const uploadTextsRouter = require('./routes/uploadTexts')
const updateTextsRouter = require('./routes/updateText')
const getTextsRouter = require('./routes/getTexts')
const deleteTextRouter = require('./routes/deleteText')

// const updateTempTextsRouter = require('./routes/utils/updateTempTexts')

const getXferStationRouter = require('./routes/getXferStation')
const deletexferStationRouter = require('./routes/deleteXferStation')

const uploadTrainTextRouter = require('./routes/uploadTrainTexts')
const deleteTrainTextsRouter = require('./routes/deleteTrainText')
const deleteAllTrainTextsRouter = require('./routes/deleteAllTrainText')

const uploadScatterDataRouter = require('./routes/uploadScatterData')
const uploadWordCloudDataRouter = require('./routes/uploadWordCloudData')

const getScatterDataRouter = require('./routes/getScatterData')
const getWordCloudRouter = require('./routes/getWordCloudData')

const mongodbRouter = require("./routes/mongodb/index")

const app = express();

// app.use(express.json({
//   limit:'50mb',
// }))
// app.use(express.raw({
//   limit:"50mb"
// }))
// app.use(express.text({
//   limit:"50mb"
// }))
// app.use(express.urlencoded({
//   limit:"4096kb"
// }))

//  注意app.all要写在 app.use 之前
// app.all("*",function(req,res,next){
//   console.log("all",req.session)
//   if (!req.url.includes('login') && !req.session.name) {
//     res.send({
//       status: 403,
//       message: '未登录',
//       data:[]
//     })
//   } else
//     next();
// })
// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
app.disable('etag');
app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({ limit:'100mb', extended: true }));

// 解决跨域问题
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));


app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/public',express.static('public'));
// 初始化 session
app.use(session({ // 配置参数
  secret: 'secret', // 加密口令
  resave: true, // 重新储存，每一次 session 修改的时候都会从重新存储
  saveUninitialized: true // 默认 true， 未初始化的时候需不需要存储内容
}))
// app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));

// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// 路由 

// 判断是否登录
app.use((req, res, next) => {
  if (!req.url.includes('login') 
  && !req.url.includes('register') 
  && !req.url.includes('users') 
  && !req.url.includes('upload_dictionary1') 
  && !req.url.includes('public') 
  && !req.url.includes('api') 
  && !req.url.includes('upload_scatterData') 
  && !req.url.includes('upload_wordCloudData')
  && !req.url.includes('mongo')
  && !req.session.name) {
    console.log("no login")
    res.send({
      status: 403,
      message: '未登录',
      data: []
    })
  } else
    next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter)

app.use('/login', loginRouter);
app.use('/register', registerRouter);


app.use('/upload_dictionary', uploadDictionaryRouter)
app.use('/get_dictionary', getDictionaryRouter)
app.use('/update_dictionary', updateDictionaryRouter)
app.use('/delete_dictionary', deleteDictionaryRouter)

app.use('/upload_texts', uploadTextsRouter)
app.use('/update_texts',updateTextsRouter)
app.use('/get_texts', getTextsRouter)
app.use('/delete_text', deleteTextRouter)

// app.use('/update_tempTexts',)

app.use('/get_xferStation',getXferStationRouter)
app.use('/delete_xferStation',deletexferStationRouter)

app.use('/upload_trainTexts',uploadTrainTextRouter)
app.use('/delete_trainTexts',deleteTrainTextsRouter)
app.use('/delete_trainTexts_all',deleteAllTrainTextsRouter)

app.use('/upload_scatterData',uploadScatterDataRouter)
app.use('/upload_wordCloudData',uploadWordCloudDataRouter)

app.use('/get_scatterData',getScatterDataRouter)
app.use('/get_wordCloudData',getWordCloudRouter)

app.use('/mongo',mongodbRouter)




// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;