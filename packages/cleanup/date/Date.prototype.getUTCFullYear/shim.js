'use strict'

const impl = require('./implementation')

module.exports = function shimDateGetUTCFullYear() {
  return impl
}
