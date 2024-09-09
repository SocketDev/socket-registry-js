'use strict'

const impl = require('./implementation')

module.exports = function shimDateProtoToJSON() {
  return impl
}
