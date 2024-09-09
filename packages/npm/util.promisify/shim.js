'use strict'

const getPolyfill = require('./polyfill')

module.exports = function shimUtilPromisify() {
  return getPolyfill()
}
