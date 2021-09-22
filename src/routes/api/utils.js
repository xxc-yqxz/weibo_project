/**
 * @description utils api 路由
 * @author xxc
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginCheck')
const koaForm = require('formidable-upload-koa')
const { saveFile } = require('../../controller/utils')

router.prefix('/api/utils')

// 上传图片
router.post('/upload', loginCheck, koaForm(), async (ctx, next) => {
    const file = ctx.req.files['file']
    const { size, path, name, type } = file
    // controller
    ctx.body = await saveFile({
        name,
        type,
        size,
        filePath: path
    })
})

module.exports = router