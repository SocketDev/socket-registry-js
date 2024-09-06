'use strict'

const byteLengthGetter = ArrayBuffer.prototype.__lookupGetter__('byteLength')

module.exports = function isArrayBuffer(value) {
  try {
    byteLengthGetter.call(value)
    return true
  } catch {}
  return false
}
