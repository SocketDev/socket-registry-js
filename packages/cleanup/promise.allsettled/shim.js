'use strict'

const impl = require('./implementation')

module.exports = function shimPromiseAllSettled() {
  return impl
}
