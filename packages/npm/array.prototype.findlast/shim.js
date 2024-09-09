'use strict'

const impl = require('./implementation')

module.exports = function shimArrayProtoFindLast() {
  return impl
}
