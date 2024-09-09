'use strict'

const impl = require('./implementation')

module.exports = function shimIteratorProtoFlatMap() {
  return impl
}
