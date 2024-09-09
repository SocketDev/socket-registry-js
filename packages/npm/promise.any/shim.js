'use strict'

const impl = require('./implementation')

module.exports = function shimPromiseAny() {
  return impl
}
