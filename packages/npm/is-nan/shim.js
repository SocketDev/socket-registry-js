'use strict'

const impl = require('./implementation')

module.exports = function shimIsNan() {
  return impl
}
