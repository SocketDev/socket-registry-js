'use strict'

const { deref } = WeakRef.prototype

module.exports = function isWeakRef(value) {
  if (value !== null && typeof value === 'object') {
    try {
      deref.call(value)
      return true
    } catch {}
  }
  return false
}
