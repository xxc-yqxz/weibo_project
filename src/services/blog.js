/**
 * @description 微博 service
 * @author xxc
 */

const { Blog, User } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 创建微博
 * @param {Object} param0 创建微博的数据{ userId, content, image }
 */
async function createBlog({ userId, content, image }) {
    const result = await Blog.create({
        userId,
        content,
        image
    })
    return result.dataValues
}

/**
 * 根据用户获取微博列表
 * @param {Object} param0 查询参数 { userName, pageIndex = 0, pageSize = 10 }
 * @param {*} param1 
 */
async function getBlogListByUser({ userName, pageIndex = 0, pageSize = 10 }) {
    // 拼接查询条件
    const userWhereOpts = {}
    if (userName) {
        userWhereOpts.userName = userName
    }

    // 执行查询
    const result = await Blog.findAndCountAll({
        limit: pageSize,    // 每页多少条
        offset: pageSize * pageIndex,    // 跳过多少条
        order: [
            ['id', 'desc']
        ],
        // 执行连表查询
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture'],
                where: userWhereOpts
            }
        ]
    })
    // result.count是总数，跟分页无关。
    // result.rows 查询结果，数组

    // 获取dataValues
    let blogList = result.rows.map(row => row.dataValues)

    blogList = blogList.map(blogItem => {
        // 将user.dataValues代替原本的user
        const user = blogItem.user.dataValues
        blogItem.user = formatUser(user)
        return blogItem
    })

    return {
        count: result.count,
        blogList
    }
}

module.exports = {
    createBlog,
    getBlogListByUser
}