/**
 * @description test demo
 * @author xxc
 */

function sum(a, b) {
    return a + b
}

// test函数是jest帮我们定义的
test('10 + 20应该等于30', () => {
    const res = sum(10, 20)
    // expect(res).toBe(30)
    expect(res).not.toBe(40)
})