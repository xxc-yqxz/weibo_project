/**
 * @description 微博 @ 用户的关系_数据模型
 * @author xxc
 */

const seq = require('../seq')
const { INTEGER, BOOLEAN } = require('../types')

const AtRelation = seq.define('atRelation', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户 ID'
    },
    blogId: {
        type: INTEGER,
        allowNull: false,
        comment: '微博Id'
    },
    isRead: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false,    // 默认未读
        comment: '是否已读'
    }
})

module.exports = AtRelation