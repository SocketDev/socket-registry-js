'use strict'

const { has: weakMapHas } = WeakMap.prototype

module.exports = function isWeakMap(value) {
  if (value !== null && typeof value === 'object') {
    try {
      weakMapHas.call(value)
      return true
    } catch {}
  }
  return false
}
