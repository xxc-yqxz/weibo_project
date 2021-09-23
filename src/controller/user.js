/**
 * @description user controller
 * @author xxc
 */

const {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
} = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
    registerUserNameNotExistInfo,
    registerFailInfo,
    loginFailInfo,
    deleteUserFailInfo,
    changeInfoFailInfo
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
        return new ErrorModel(registerUserNameNotExistInfo)
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

/**
 *  
 * @param {Object} ctx koa2 ctx
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login(ctx, userName, password) {
    // 登录成功ctx.session.userInfo = xxxx

    // 获取用户信息
    const userInfo = await getUserInfo(userName, doCrypto(password))
    if (!userInfo) {
        // 登录失败
        return new ErrorModel(loginFailInfo)
    }

    // 登录成功
    if (ctx.session.userInfo == null) {
        ctx.session.userInfo = userInfo
    }
    return new SuccessModel()
}

/**
 * 删除当前用户
 * @param {string} userName 用户名
 */
async function deleteCurUser(userName) {
    const result = await deleteUser(userName)
    if (result) {
        // 成功
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel(deleteUserFailInfo)
}

/**
 * 修改个人信息
 * @param {Object} ctx ctx
 * @param {*} nickName 昵称
 * @param {*} city 城市 
 * @param {*} picture 头像 
 */
async function changeInfo(ctx, { nickName, city, picture }) {
    const { userName } = ctx.session.userInfo
    if (!nickName) {
        nickName = userName
    }
    // service
    const result = await updateUser(
        {
            newNickName: nickName,
            newCity: city,
            newPicture: picture
        },
        { userName }
    )

    if (result) {
        // 执行成功后，将session中的用户信息更新一下
        Object.assign(ctx.session.userInfo, {
            nickName,
            city,
            picture
        })
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel(changeInfoFailInfo)
}

module.exports = {
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo
}