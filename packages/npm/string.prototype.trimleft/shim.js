'use strict'

const impl = require('./implementation')

module.exports = function shimStringProtoTrimLeft() {
  return impl
}
