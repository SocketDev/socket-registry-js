'use strict'

const impl = require('./implementation')

module.exports = function shimDateProtoToString() {
  return impl
}
