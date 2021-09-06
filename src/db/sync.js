/**
 * @description sequelize 同步数据库
 * @author xxc
 */

const seq = require('./seq')

require('./model')

// 测试连接
seq.authenticate().then(() => {
    console.log('auth ok')
}).catch(() => {
    console.log('auth err')
})

// 执行同步
// force:true -> 表示强制执行。如果数据库中有这个表，则删除后再创建。(重新建表)
seq.sync({ force: true }).then(() => {
    console.log('sync ok')
    process.exit()
})