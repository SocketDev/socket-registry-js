'use strict'

const impl = require('./implementation')

module.exports = function shimDateGetUTCMonth() {
  return impl
}
