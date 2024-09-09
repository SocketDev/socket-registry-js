'use strict'

const impl = require('./implementation')

module.exports = function shimStringProtoIncludes() {
  return impl
}
