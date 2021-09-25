/**
 * @description user API 路由
 * @author xxc
 */

const router = require('koa-router')()
const {
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo,
    changePassword,
    logout
} = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { isTest } = require('../../utils/env')
const { loginCheck } = require('../../middlewares/loginCheck')
const { getFollowers } = require('../../controller/user-relation')
const { SuccessModel } = require('../../model/ResModel')

router.prefix('/api/user')

// 注册
router.post('/register', genValidator(userValidate), async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body
    // 调用controller ，返回
    // 此处register的参数传成对象形式，可以使调用时传入的参数顺序随机
    ctx.body = await register({
        userName, password, gender
    })
})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    // controller
    ctx.body = await isExist(userName)
})

// 登录 restfulAPI
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    // controller
    ctx.body = await login(ctx, userName, password)
})

// 删除
router.post('/delete', loginCheck, async (ctx, next) => {
    if (isTest) {
        // 测试环境下，测试账号登录之后，删除自己
        const { userName } = ctx.session.userInfo
        // 调用 controller
        ctx.body = await deleteCurUser(userName)
    }
})

// 修改个人信息
router.patch('/changeInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
    const { nickName, city, picture } = ctx.request.body
    // controller
    ctx.body = await changeInfo(ctx, { nickName, city, picture })
})

// 修改密码
router.patch('/changePassword', loginCheck, genValidator(userValidate), async (ctx, next) => {
    const { password, newPassword } = ctx.request.body
    const { userName } = ctx.session.userInfo   // 此处获取session中的数据并没有说规定要写在哪一层，既可以是路由层也可以是controller层
    // controller
    ctx.body = await changePassword({ userName, password, newPassword })
})

// 退出登录
router.post('/logout', loginCheck, async (ctx, next) => {
    // controller
    ctx.body = await logout(ctx)
})

// 获取at列表，即关注人列表
router.get('/getAtList', loginCheck, async (ctx, next) => {
    const { id: userId } = ctx.session.userInfo

    const result = await getFollowers(userId)
    const { followersList } = result.data
    const list = followersList.map(user => {
        return `${user.nickName}-${user.userName}`
    })
    ctx.body = list

    // 格式如：['张三 - zhangsan','李四 - lisi','昵称 - userName']
    ctx.body = list
})

module.exports = router