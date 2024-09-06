'use strict'

const impl = require('./implementation')

module.exports = function shimStringProtoMatchAll() {
  return impl
}
