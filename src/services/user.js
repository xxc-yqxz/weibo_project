/**
 * @description user service
 * @author xxc
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 获取用户信息（用于登录及判断用户是否存在和用户设置页）
 * @param {string} uerName 用户名
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
    // 查询条件
    const whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt, { password })
    }

    // 查询
    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })
    if (result == null) {
        // 未找到
        return result
    }

    // 格式化
    const formatRes = formatUser(result.dataValues)


    return formatRes
}

/**
 * 创建用户
 * @param {string} userName  用户名
 * @param {string} password  密码
 * @param {number} gender  性别
 * @param {string} nickName  昵称
 */
async function createUser({ userName, password, gender = 3, nickName }) {
    const userInfo = await User.create({
        userName,
        password,
        nickName: nickName ? nickName : userName,
        gender
    })
    return userInfo.dataValues
}

/**
 * 删除用户
 * @param {string} userName 用户名
 */
async function deleteUser(userName) {
    const result = await User.destroy({
        where: {
            userName
        }
    })
    // result 删除的行数
    return result > 0
}

/**
 * 更新用户信息
 * @param {Object} param0 要修改的内容 {newPassword, newNickName, newPicture, newCity }
 * @param {*} param1 查询条件 {userName,password}
 */
async function updateUser(
    { newPassword, newNickName, newPicture, newCity },
    { userName, password }
) {
    // 拼接修改内容
    const updateData = {}
    if (newPassword) {
        updateData.password = newPassword
    }
    if (newNickName) {
        updateData.nickName = newNickName
    }
    if (newPicture) {
        updateData.picture = newPicture
    }
    if (newCity) {
        updateData.nickName = newCity
    }
    // 拼接查询条件
    const whereData = {
        userName
    }
    if (password) {
        whereData.password = password
    }
    // 执行修改
    const result = await User.update(updateData, {
        where: whereData
    })
    // 若修改成功result[0]会为1，否则为0
    return result[0] > 0    // 修改的行数
}

module.exports = {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
}