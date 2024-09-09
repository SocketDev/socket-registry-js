'use strict'

const byteLengthGetter = ArrayBuffer.prototype.__lookupGetter__('byteLength')

module.exports = function byteLength(ab) {
  try {
    return byteLengthGetter.call(ab)
  } catch {}
  return Number.NaN
}
