'use strict'

const impl = require('./implementation')

module.exports = function shimDateProtoGetUTCMonth() {
  return impl
}
