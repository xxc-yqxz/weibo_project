/**
 * @description 微博 @ 关系 test
 * @author xxc
 */

const server = require('../server')
const { L_COOKIE, L_USER_NAME, X_COOKIE } = require('../testUserInfo')

let BLOG_ID

test('张三创建一条微博，@李四，应该成功', async () => {
    const content = '单元测试自动创建的微博 @李四-' + L_USER_NAME
    const res = await server
        .post('/api/blog/create')
        .send({
            content,
        })
        .set('cookie', X_COOKIE)
    expect(res.body.errno).toBe(0)

    // 记录微博 id
    BLOG_ID = res.body.data.id
})

test('获取李四的 @ 列表，应该有刚刚创建的微博', async () => {
    const res = await server
        .get('/api/atMe/loadMore/0')    // 列表是倒序排列
        .set('cookie', L_COOKIE)
    expect(res.body.errno).toBe(0)
    const data = res.body.data
    const blogList = data.blogList
    const isHaveCurBlog = blogList.some(blog => blog.id === BLOG_ID)
    expect(isHaveCurBlog).toBe(true)
})