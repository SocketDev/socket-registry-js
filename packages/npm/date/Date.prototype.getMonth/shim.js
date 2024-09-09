'use strict'

const impl = require('./implementation')

module.exports = function shimDateProtoGetMonth() {
  return impl
}
