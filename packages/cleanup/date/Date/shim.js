'use strict'

const impl = require('./implementation')

module.exports = function shimDate() {
  return impl
}
