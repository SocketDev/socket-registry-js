'use strict'

const impl = require('./implementation')

module.exports = function shimDateGetUTCDate() {
  return impl
}
