'use strict'

const impl = require('./implementation')

module.exports = function shimDateProtoToISOString() {
  return impl
}
