'use strict'

const impl = require('./implementation')

module.exports = function shimDateProtoGetDate() {
  return impl
}
