'use strict'

const { deepEqual: assertIsDeepEqual } = require('node:assert')
const { isDeepStrictEqual } = require('node:util')

module.exports = function deepEqual(value1, value2, options_ = {}) {
  const options = { __proto__: null, ...options_ }
  try {
    return options.strict
      ? isDeepStrictEqual(value1, value2)
      : assertIsDeepEqual(value1, value2)
  } catch {}
  return false
}
