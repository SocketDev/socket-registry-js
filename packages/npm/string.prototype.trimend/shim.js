'use strict'

const impl = require('./implementation')

module.exports = function shimStringProtoTrimEnd() {
  return impl
}
