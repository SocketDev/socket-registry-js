'use strict'

const impl = require('./implementation')

module.exports = function shimObjectHasOwn() {
  return impl
}
