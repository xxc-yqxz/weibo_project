/**
 * @description 数据模型入口文件
 * @author xxc
 */

const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')

// 一个用户拥有多个微博，使得查询博客时可以顺带查出用户
Blog.belongsTo(User, {
    foreignKey: 'userId'
})

// 查询用户顺带查出博客来
// User.hasMany(Blog)

// 下面两个方法创建了两个外键关系,UserRelation中的followerId、userId与User表中的id（主键绑定了关联）
UserRelation.belongsTo(User, {
    foreignKey: 'followerId'
})

User.hasMany(UserRelation, {
    foreignKey: 'userId'
})

// 为Blog创建外键userId，对应UserRelation中的followerId
// 没写targetKey时则默认关联id，如上面的那些
// 此处创建外键会失败，因为上方已经使用了Blog.belongsTo,但是不会影响Blog和UserRelation的连表查询
Blog.belongsTo(UserRelation, {
    foreignKey: 'userId',
    targetKey: 'followerId'
})

module.exports = {
    User,
    Blog,
    UserRelation
}