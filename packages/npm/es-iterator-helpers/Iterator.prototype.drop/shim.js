'use strict'

const impl = require('./implementation')

module.exports = function shimIteratorProtoDrop() {
  return impl
}
