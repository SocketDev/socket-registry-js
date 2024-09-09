'use strict'

const impl = require('./implementation')

module.exports = function shimIteratorProtoTake() {
  return impl
}
