'use strict'

const { valueOf: strValueOf } = String.prototype

module.exports = function isString(value) {
  if (typeof value === 'string') {
    return true
  }
  if (value !== null && typeof value === 'object') {
    try {
      strValueOf.call(value)
      return true
    } catch {}
  }
  return false
}
