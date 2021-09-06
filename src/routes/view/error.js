/**
 * @description error 404 路由
 * @author xxc
 */
const router = require('koa-router')()

// error
router.get('/error', async (ctx, next) => {
    await ctx.render('error')   // 此处的error为ejs模板的名字
})

// 404
router.get('*', async (ctx, next) => {
    await ctx.render('404')
})

module.exports = router