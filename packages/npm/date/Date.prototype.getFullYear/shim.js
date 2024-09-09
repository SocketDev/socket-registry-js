'use strict'

const impl = require('./implementation')

module.exports = function shimDateProtoGetFullYear() {
  return impl
}
