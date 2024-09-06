'use strict'

module.exports = Object.assign(
  function hasPropertyDescriptors() {
    return true
  },
  {
    hasArrayLengthDefineBug() {
      return false
    }
  }
)
