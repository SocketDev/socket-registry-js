'use strict'

const impl = require('./implementation')

module.exports = function shimDateProtoGetUTCFullYear() {
  return impl
}
