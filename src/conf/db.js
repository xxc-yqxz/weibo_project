/**
 * @description 存储配置
 * @author xxc
 */
const { isProd } = require('../utils/env.js')

// 此处将REDIS_CONF单独抽出成一个文件的原因：为了适配各种环境下REDIS_CONF的变化
let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}

let MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'XXC',
    port: '3306',
    database: 'koa2_weibo_db',
}

if (isProd) {
    REDIS_CONF = {
        // 线上的redis配置
        port: 6379,
        host: '127.0.0.1'
    }
    MYSQL_CONF = {
        // 线上的mysql配置
        host: 'localhost',
        user: 'root',
        password: 'XXC',
        port: '3306',
        database: 'koa2_weibo_db',
    }
}

module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}