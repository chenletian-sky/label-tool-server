const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });

  // console.log("test", req.session)
  if (req.session.name === "") {
    return res.redirect("/login")
  }

  res.send("我已登陆")
});

module.exports = router;