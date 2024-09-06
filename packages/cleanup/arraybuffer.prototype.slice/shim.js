'use strict'

const impl = require('./implementation')

module.exports = function shimArrayBufferProtoSlice() {
  return impl
}
