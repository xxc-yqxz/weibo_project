/**
 * @description 加密方法
 * @author xxc
 */

// crypto为nodejs自带的1加密模块
const crypto = require('crypto')
// CRYPTO_SECRET_KEY为加密的密钥
const { CRYPTO_SECRET_KEY } = require('../conf/secretKeys')

/**
 * md5 加密
 * @param {string} content 明文
 * @returns 
 */
function _md5(content) {
    const md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

/**
 * 机密方法
 * @param {string} content 明文
 */
function doCrypto(content) {
    const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
    return _md5(str)
}

module.exports = {
    doCrypto
}