/**
 * @description sequelize 实例
 * @author xxc
 */

const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')

const { host, user, password, database } = MYSQL_CONF
console.log(host, user, password, database)
const conf = {
    host,
    dialect: 'mysql'    // 声明操作哪个数据库
}

// 如果实在测试环境下，关闭sql语句打印
if (isTest) {
    conf.logging = () => { }
}

// 线上环境使用连接池
if (isProd) {
    conf.pool = {
        max: 5,  // 连接池中最大的连接数量
        min: 0,  // 连接池中最小的连接数量
        idle: 10000  // 如果一个连接池 10s 之内没有被使用，则释放
    }
}

const seq = new Sequelize(database, user, password, conf)

module.exports = seq