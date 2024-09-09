'use strict'

const impl = require('./implementation')

module.exports = function shimIteratorProto() {
  return impl
}
