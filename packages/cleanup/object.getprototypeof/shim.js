'use strict'

const impl = require('./implementation')

module.exports = function shimObjectGetPrototypeOf() {
  return impl
}
