/**
 * @description json test
 * @author xxc
 */

const server = require('./server')

test('json 接口返回数据格式正确', async () => {
    // 测试get请求
    // const response = await server.get('/json')
    // expect(response.body).toEqual({      // toEqual 判断对象数据是否一样
    //     title: 'koa2 json'
    // })
    // expect(response.body.title).toBe('koa2 json')

    // 测试post请求
    // const res = await (await server.post('/login')).send({
    //     userName: "zhangsan",
    //     password: '123'
    // })
})