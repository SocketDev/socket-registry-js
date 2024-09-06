'use strict'

const lengthGetter = Int8Array.prototype.__lookupGetter__('length')

module.exports = function typedArrayLength(ta) {
  try {
    return lengthGetter.call(ta)
  } catch {}
  return false
}
