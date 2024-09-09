'use strict'

const { valueOf: symValueOf } = Symbol.prototype

module.exports = function isSymbol(value) {
  if (typeof value === 'symbol') {
    return true
  }
  if (value !== null && typeof value === 'object') {
    try {
      symValueOf.call(value)
      return true
    } catch {}
  }
  return false
}
