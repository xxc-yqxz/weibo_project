/**
 * @description 个人主页 test
 * @author xxc
 */

const server = require('../server')
const { X_COOKIE, X_USER_NAME } = require('../testUserInfo')

test('个人主页，加载第一页数据，应该成功', async () => {
    const res = await server
        .get(`/api/profile/loadMore/${X_USER_NAME}/0`)
        .set('cookie', X_COOKIE)
    expect(res.body.errno).toBe(0)

    const data = res.body.data
    // toHaveProperty:测试是否包含此属性
    expect(data).toHaveProperty('isEmpty')
    expect(data).toHaveProperty('blogList')
    expect(data).toHaveProperty('pageSize')
    expect(data).toHaveProperty('pageIndex')
    expect(data).toHaveProperty('count')
})