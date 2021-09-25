/**
 * @description 用户关系 单元测试
 * @author xxc
 */

const server = require('../server')
const { getFans, getFollowers } = require('../../src/controller/user-relation')
const {
    L_ID,
    L_USER_NAME,
    X_ID,
    X_USER_NAME,
    X_COOKIE
} = require('../testUserInfo')

// 先让XXC取消关注李四（为了避免现在张三关注了李四）
test('无论如何，先取消关注，应该成功', async () => {
    const res = await server
        .post('/api/profile/unFollow')
        .send({ userId: L_ID })
        .set('cookie', X_COOKIE)
    expect(1).toBe(1)   // 只是为了取消关注，以便后续关注成功，无论是否取消关注成功，都返回一个通过的测试结果
})

// 添加关注
test('XXC关注李四，应该成功', async () => {
    const res = await server
        .post('/api/profile/follow')
        .send({ userId: L_ID })
        .set('cookie', X_COOKIE)
    expect(res.body.errno).toBe(0)
})

// 获取粉丝
test('获取李四的粉丝，应该有XXC', async () => {
    const result = await getFans(L_ID)
    const { count, userList } = result.data
    const hasUserName = userList.some(fanInfo => {
        return fanInfo.userName === X_USER_NAME
    })
    expect(count > 0).toBe(true)
    expect(hasUserName).toBe(true)
})

// 获取关注人
test('获取XXC的关注人，应该有李四', async () => {
    const result = await getFollowers(X_ID)
    const { count, followersList } = result.data
    const hasUserName = followersList.some(followerInfo => {
        return followerInfo.userName === L_USER_NAME
    })
    expect(count > 0).toBe(true)
    expect(hasUserName).toBe(true)
})

// 获取at 列表
test('获取张三的 at 列表，应该有李四', async () => {
    const res = await server
        .get('/api/user/getAtList')
        .set('cookie', X_COOKIE)
    const atList = res.body
    const hasUserName = atList.some(item => {
        return item.indexOf(`-${L_USER_NAME}`) > 0
    })
    expect(hasUserName).toBe(true)
})

// 取消关注
test('XXC取消关注李四，应该成功', async () => {
    const res = await server
        .post('/api/profile/unFollow')
        .send({ userId: L_ID })
        .set('cookie', X_COOKIE)
    expect(res.body.errno).toBe(0)
})