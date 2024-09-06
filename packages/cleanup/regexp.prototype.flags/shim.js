'use strict'

const impl = require('./implementation')

module.exports = function shimRegExpProtoFlags() {
  return impl
}
