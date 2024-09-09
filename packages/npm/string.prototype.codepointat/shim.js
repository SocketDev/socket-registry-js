'use strict'

const impl = require('./implementation')

module.exports = function shimStringProtoCodePointAt() {
  return impl
}
