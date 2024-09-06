'use strict'

const impl = require('./implementation')

module.exports = function shimDateNow() {
  return impl
}
