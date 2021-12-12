# 项目介绍

## 项目初始化

```
# 安装express-generator脚手架
npm i -g express-generator

# 创建项目
express node-demo

# 安装依赖
cd node-demo
npm i

# 启动服务
npm start

```

安装 nodemon，修改项目源码后，无需重启服务就可以实现热部署

```js
# 安装nodemon
npm i -g nodemon

// 在package.json文件中配置

"scripts": {
    "start": "nodemon ./bin/www"
}

```

安装cors模块解决跨域问题

```
# 安装cors
cnpm i cors --save

```

在 app.js 文件中配置 cors 跨域问题

```
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

```

