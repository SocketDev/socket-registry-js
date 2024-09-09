'use strict'

const { has: mapHas } = Map.prototype

module.exports = function isMap(value) {
  if (value !== null && typeof value === 'object') {
    try {
      mapHas.call(value)
      return true
    } catch {}
  }
  return false
}
