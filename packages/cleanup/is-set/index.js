'use strict'

const { has: setHas } = Set.prototype

module.exports = function isSet(value) {
  if (value !== null && typeof value === 'object') {
    try {
      setHas.call(value)
      return true
    } catch {}
  }
  return false
}
