'use strict'

const impl = require('./implementation')

module.exports = function shimIteratorProtoFilter() {
  return impl
}
