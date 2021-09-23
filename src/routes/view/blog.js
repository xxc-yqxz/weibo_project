/**
 * @description 微博 view路由
 * @author xxc
 */

const { loginRedirect } = require('../../middlewares/loginCheck')

const router = require('koa-router')()

router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index', {})
})

module.exports = router