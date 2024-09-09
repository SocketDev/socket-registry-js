'use strict'

const impl = require('./implementation')

module.exports = function shimDateProtoGetUTCDate() {
  return impl
}
