const router = require('koa-router')()
const { loginRedirect, loginCheck } = require('../middlewares/loginCheck')

router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    msg: '你好',
    isMe: false,
    blogList: [
      {
        id: 1,
        title: 'aaa'
      },
      {
        id: 2,
        title: 'aaa'
      },
      {
        id: 3,
        title: 'aaa'
      }
    ]
  })
})

router.get('/json', loginCheck, async (ctx, next) => {
  // 此处能有session是因为在app.js中配置了
  // 此种配置下，session要使用后才能生效，并非访问一个随便的页面都会导致浏览器生成cookie、redis保存session。
  // const session = ctx.session
  // if (session.viewNum == null) {
  //   session.viewNum = 0
  // }
  // session.viewNum++;
  ctx.body = {
    title: 'koa2 json',
    // viewNum: session.viewNum
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
