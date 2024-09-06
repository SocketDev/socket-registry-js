'use strict'

const impl = require('./implementation')

module.exports = function shimReflectGetPrototypeOf() {
  return impl
}
