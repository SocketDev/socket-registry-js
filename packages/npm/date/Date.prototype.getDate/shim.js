'use strict'

const impl = require('./implementation')

module.exports = function shimDateGetDate() {
  return impl
}
