'use strict'

const impl = require('./implementation')

module.exports = function shimStringProtoReplaceAll() {
  return impl
}
