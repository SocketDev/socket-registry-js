'use strict'

const impl = require('./implementation')

module.exports = function shimIterator() {
  return impl
}
