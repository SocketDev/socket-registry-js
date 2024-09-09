'use strict'

const { getDay } = Date.prototype

module.exports = function isDateObject(value) {
  if (value !== null && typeof value === 'object') {
    try {
      getDay.call(value)
      return true
    } catch {}
  }
  return false
}
