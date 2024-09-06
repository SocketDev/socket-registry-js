'use strict'

const impl = require('./implementation')

module.exports = function shimStringProtoTrimStart() {
  return impl
}
