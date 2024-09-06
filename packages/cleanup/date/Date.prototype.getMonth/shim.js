'use strict'

const impl = require('./implementation')

module.exports = function shimDateGetMonth() {
  return impl
}
