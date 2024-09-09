'use strict'

const impl = require('./implementation')

module.exports = function shimArrayProtoForEach() {
  return impl
}
