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
    if (!file) {
        return
    }
    // 此处的path为选择图片的本地路径 ：D:\Temp\upload_d3d42229b58e5ba119ed3d4614084fe7
    const { size, path, name, type } = file
    // controller
    ctx.body = await saveFile({
        name,
        type,
        size,
        filePath: path
    })
    console.log(path, 111)
})

module.exports = router