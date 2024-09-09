'use strict'

const impl = require('./implementation')

module.exports = function shimIteratorProtoForEach() {
  return impl
}
