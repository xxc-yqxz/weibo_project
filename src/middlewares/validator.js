/**
 * @description json schema 验证中间件
 * @author xxc
 */

const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')

/**
 * 生成 json schema验证的中间件
 * @param {function} validateFn 验证函数
 * @returns 
 */
function genValidator(validateFn) {
    // 定义中间件函数，并返回
    return async (ctx, next) => {
        const data = ctx.request.body
        // 校验
        const error = validateFn(data)
        if (error) {
            // 验证失败
            ctx.body = new ErrorModel(jsonSchemaFileInfo)
            // 直接返回，不走下一个中间件
            return
        }
        // 验证成功，继续
        await next()
    }
}

module.exports = {
    genValidator
}