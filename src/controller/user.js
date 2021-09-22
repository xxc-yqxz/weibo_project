/**
 * @description user controller
 * @author xxc
 */

const { getUserInfo, createUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
    registerUserNameNotExistInfo,
    registerFailInfo,
} = require('../model/ErrorInfo')
const { doCrypto } = require('../utils/cryp')

/**
 * 用户名是否存在
 * @param {String} userName 用户名
 */
async function isExist(userName) {
    // 业务逻辑处理
    // 调用 services 获取数据
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        // 已存在
        return new SuccessModel(userInfo)
        // {errno:0,data:{.....}}
    } else {
        // {errno:10003,message:'用户名未存在'}
        return new ErrorModel(registerUserNameNotExistInfo)
    }
    // 统一返回格式,定义model后返回
}

/**
 * 注册
 * @param {strin} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别（1男，2女，3保密）
 */
async function register({ userName, password, gender }) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        // 用户名已存在
        return ErrorModel(registerFailInfo)
    }

    // 注册 service
    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender
        })
        return new SuccessModel()
    } catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(registerFailInfo)
    }
}

module.exports = {
    isExist,
    register
}