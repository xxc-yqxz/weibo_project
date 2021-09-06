/**
 * @description 存储配置
 * @author xxc
 */
import { isProd } from '../utils/env.js'

// 此处将REDIS_CONF单独抽出成一个文件的原因：为了适配各种环境下REDIS_CONF的变化
let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}

if (isProd) {
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    REDIS_CONF
}