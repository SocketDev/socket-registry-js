'use strict'

const { valueOf: bigIntValueOf } = BigInt.prototype
const { valueOf: boolValueOf } = Boolean.prototype
const { valueOf: numValueOf } = Number.prototype
const { valueOf: strValueOf } = String.prototype
const { valueOf: symValueOf } = Symbol.prototype

module.exports = function unboxPrimitive(value) {
  if (
    value === null ||
    (typeof value !== 'object' && typeof value !== 'function')
  ) {
    throw new TypeError('value is an unboxed primitive')
  }
  if (typeof value !== 'function') {
    try {
      return strValueOf.call(value)
    } catch {}
    try {
      return numValueOf.call(value)
    } catch {}
    try {
      return boolValueOf.call(value)
    } catch {}
    try {
      return symValueOf.call(value)
    } catch {}
    try {
      return bigIntValueOf.call(value)
    } catch {}
  }
  throw new TypeError('value is a non-boxed-primitive object')
}
