'use strict'

const impl = require('./implementation')

const keysShim = function keys(object) {
  return impl(object)
}
keysShim.shim = function shimObjectKeys() {
  return impl
}
module.exports = keysShim
