'use strict'

const impl = require('./implementation')

module.exports = function shimArrayProtoFind() {
  return impl
}
