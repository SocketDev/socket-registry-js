'use strict'

const impl = require('./implementation')

module.exports = function shimDateGetFullYear() {
  return impl
}
