'use strict'

const impl = require('./implementation')

module.exports = function shimStringProtoTrimRight() {
  return impl
}
