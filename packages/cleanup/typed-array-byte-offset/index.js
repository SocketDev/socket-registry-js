'use strict'

const byteOffsetGetter = Int8Array.prototype.__lookupGetter__('byteOffset')

module.exports = function typedArrayByteOffset(ta) {
  try {
    return byteOffsetGetter.call(ta)
  } catch {}
  return false
}
