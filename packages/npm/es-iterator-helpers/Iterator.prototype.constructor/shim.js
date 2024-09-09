'use strict'

const impl = require('./implementation')

module.exports = function shimIteratorProtoConstructor() {
  return impl
}
