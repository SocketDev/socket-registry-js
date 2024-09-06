'use strict'

const { has: weakSetHas } = WeakSet.prototype

module.exports = function isWeakSet(value) {
  if (value !== null && typeof value === 'object') {
    try {
      weakSetHas.call(value)
      return true
    } catch {}
  }
  return false
}
