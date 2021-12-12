const nodemailer = require('nodemailer'); 

const sendEmail = (email) => {
  // 创建 nodemailer 配置
  const transporter = nodemailer.createTransport({
    //支持列表： https://nodemailer.com/smtp/well-known/
    service: 'QQ', // 老严用的是 QQ
    port: 465, // SMTP 端口 这个不用管
    secureConnection: true, 
    auth: {
        user: '1967914901@qq.com',
        pass: 'aohgmvnrbtoncdhb', 
    }
  });
  // 设置 四位数 验证码
  const verificationCode = (1000 + Math.random() * 8999).toFixed(0)
  // 邮件内容
  const mailOptions = {
    from: '"自动化实体抽取工具" <1967914901@qq.com>', 
    // to: '2977569875@qq.com', 
    to: email,
    subject: '邮箱验证', 
    text: '你的验证码为：' + verificationCode
    // html:'这里也可以写html'
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
        reject(error)
      }
      resolve({
        verificationCode,
        info
      })
    });
  })
}

exports.sendEmail = sendEmail;



