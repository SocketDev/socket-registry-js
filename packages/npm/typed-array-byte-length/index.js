'use strict'

const byteLengthGetter = Int8Array.prototype.__lookupGetter__('byteLength')

module.exports = function typedArrayByteLength(ta) {
  try {
    return byteLengthGetter.call(ta)
  } catch {}
  return false
}
