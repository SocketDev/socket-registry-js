'use strict'

const impl = require('./implementation')

module.exports = function shimIteratorProtoFind() {
  return impl
}
