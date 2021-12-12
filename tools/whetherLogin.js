const whetherLogin = (req)=>{
  if (!req.url.includes('login') && !req.session.name) {
    res.send({
      status: 403,
      message: '未登录',
      data:[]
    })
  } else
    next();
}