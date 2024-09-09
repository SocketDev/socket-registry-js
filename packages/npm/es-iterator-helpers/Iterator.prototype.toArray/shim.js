'use strict'

const impl = require('./implementation')

module.exports = function shimIteratorProtoToArray() {
  return impl
}
