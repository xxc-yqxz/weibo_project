## 补充知识点：

### 1.git操作相关

- git commit -m "refactor:"	-> refactor表示修改了目录结构



## 一、知识点介绍

<img src="C:\Users\89404\AppData\Roaming\Typora\typora-user-images\image-20210902181257902.png" alt="image-20210902181257902" style="zoom:50%;" />

- 架构图设计

  <img src="C:\Users\89404\AppData\Roaming\Typora\typora-user-images\image-20210902181346138.png" alt="image-20210902181346138" style="zoom:40%;" />

- 技术方案设计

  架构设计

  接口和路由

  数据表和存储模型

- 功能开发

  用户：登录、注册、用户设置，粉丝和关注

  微博：发布，列表（首页、个人主页、广场页）

  @功能：@某人，回复，接收@到我的消息

- 线上环境

  pm2和多进程

  nginx和反向代理

  日志

- 总结最佳实践

  项目结构

  错误处理

  代码风格

  质量保证

  安全

  线上环境

## 二、技术选型和知识点介绍

### 1.技术选型概述

> 框架选型（koa2(async/await) vs express(异步基于js回调) vs egg(业务封装完备，不适合学习)）
>
> 数据库选型（mysql(企业应用最广泛，成本低) vs mongodb）
>
> 登录技术（session(广泛一些。适用于域名统一，用到模板引擎的情况) vs jwt）
>
> 前端页面（ejs后端模板引擎 (服务端渲染) vs vue/react前端框架(本身比较复杂，且是前后端分离开发方式)）
>
> 缓存数据库(redis)
>
> 单元测试（jest）

### 2.介绍koa2-创建项目

> 1.安装koa-generator 
>
> npm install -g koa-generator    (node版本要大于等于8.0)
>
> 2.使用脚手架新建项目
>
> koa2 -e Nodejs-Koa2模拟新浪微博  （-e表示使用ejs模板引擎）
>
> 3.cd Nodejs-Koa2模拟新浪微博 && npm install
>
> 4.连接远程仓库
>
> 5.npm i cross-env -D
>
> 6.配置package.json
>
> ```json
> "scripts": {
>     "start": "node bin/www",
>     "dev": "cross-env NODE_ENV=dev nodemon bin/www",
>     "prd": "cross-env NODE_ENV=production pm2 start bin/www",
>     "test": "echo \"Error: no test specified\" && exit 1"
>   }
> ```

### 3.介绍koa2-讲解代码结构



<img src="D:\Users\89404\Pictures\temp\6.jpg" alt="6" style="zoom: 67%;" />

<img src="D:\Users\89404\Pictures\temp\7.jpg" alt="7" style="zoom:67%;" />

### 4.介绍koa2 - 演示路由

```js
- src/routes/users.js
const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = {
    userName,
    password
  }
})


module.exports = router
```

```js
- src/routes/index.js

const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/profile/:userName', async (ctx, next) => {
  // ctx.params可以获取/:userName中的所有参数
  const { userName } = ctx.params
  ctx.body = {
    title: 'this is profile page',
    userName
  }
})

router.get('/loadMore/:userName/:pageIndex', async (ctx, next) => {
  const { userName, pageIndex } = ctx.params
  ctx.body = {
    title: 'this is loadMore api',
    userName,
    pageIndex
  }
})

module.exports = router
```

