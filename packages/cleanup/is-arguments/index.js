'use strict'

module.exports = function isArguments(value) {
  return (
    !(
      value !== null &&
      typeof value === 'object' &&
      Symbol.toStringTag in value
    ) || Object.prototype.toString.call(value) === '[object Arguments]'
  )
}
