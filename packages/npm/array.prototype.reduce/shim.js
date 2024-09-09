'use strict'

const impl = require('./implementation')

module.exports = function shimArrayProtoReduce() {
  return impl
}
