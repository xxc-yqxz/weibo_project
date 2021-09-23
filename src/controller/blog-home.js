/**
 * @description 首页 controller
 * @author xxc
 */

const xss = require('xss')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlog } = require('../services/blog')

/**
 * 创建微博
 * @param {Object} param0 创建微博所需的数据{ userId, content, image }
 */
async function create({ userId, content, image }) {
    // service
    try {
        // 创建微博
        const blog = await createBlog({
            userId,
            // xss过滤，防止content为js代码，泄漏用户信息
            content: xss(content),
            image
        })
        return new SuccessModel(blog)
    } catch (error) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(createBlogFailInfo)
    }
}

module.exports = {
    create
}