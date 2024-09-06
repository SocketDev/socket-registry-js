'use strict'

const { has: mapHas } = Map.prototype
const { has: setHas } = Set.prototype
const { has: weakMapHas } = WeakMap.prototype
const { has: weakSetHas } = WeakSet.prototype

module.exports = function whichCollection(value) {
  if (value !== null && typeof value === 'object') {
    try {
      mapHas.call(value)
      return 'Map'
    } catch {}
    try {
      setHas.call(value)
      return 'Set'
    } catch {}
    try {
      weakMapHas.call(value)
      return 'WeakMap'
    } catch {}
    try {
      weakSetHas.call(value)
      return 'WeakSet'
    } catch {}
  }
  return false
}
