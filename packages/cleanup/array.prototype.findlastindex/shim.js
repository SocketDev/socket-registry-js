'use strict'

const impl = require('./implementation')

module.exports = function shimArrayProtoFindLastIndex() {
  return impl
}
