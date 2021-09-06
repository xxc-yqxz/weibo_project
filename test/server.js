/**
 * @description jest server
 * @author xxc
 */

const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)