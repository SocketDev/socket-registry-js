'use strict'

const byteLengthGetter =
  SharedArrayBuffer.prototype.__lookupGetter__('byteLength')

module.exports = function isSharedArrayBuffer(value) {
  if (value !== null && typeof value === 'object') {
    try {
      byteLengthGetter.call(value)
      return true
    } catch {}
  }
  return false
}
