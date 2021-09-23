/**
 * @description 数据模型入口文件
 * @author xxc
 */

const User = require('./User')
const Blog = require('./Blog')

// 一个用户拥有多个微博，使得查询博客时可以顺带查出用户
Blog.belongsTo(User, {
    foreignKey: 'userId'
})

// 查询用户顺带查出博客来
// User.hasMany(Blog)

module.exports = {
    User,
    Blog
}