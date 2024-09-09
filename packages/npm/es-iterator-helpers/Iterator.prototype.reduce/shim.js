'use strict'

const impl = require('./implementation')

module.exports = function shimIteratorProtoReduce() {
  return impl
}
