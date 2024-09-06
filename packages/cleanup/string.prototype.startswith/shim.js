'use strict'

const impl = require('./implementation')

module.exports = function shimStringProtoStartsWith() {
  return impl
}
