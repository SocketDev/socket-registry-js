'use strict'

const bufferGetter = Int8Array.prototype.__lookupGetter__('buffer')

module.exports = function typedArrayBuffer(ta) {
  try {
    return bufferGetter.call(ta)
  } catch {}
  throw new TypeError('Not a Typed Array')
}
