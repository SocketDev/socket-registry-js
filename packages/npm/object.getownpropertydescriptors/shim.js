'use strict'

const impl = require('./implementation')

module.exports = function shimObjectGetOwnPropertyDescriptors() {
  return impl
}
