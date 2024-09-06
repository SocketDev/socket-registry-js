'use strict'

const impl = require('./implementation')

module.exports = function shimStringProtoEndsWith() {
  return impl
}
