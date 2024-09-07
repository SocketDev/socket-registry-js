'use strict'

const Impl = require('./implementation')
const desc = value => ({
  __proto__: null,
  configurable: true,
  writable: true,
  value
})

module.exports = Object.defineProperties(
  function AggregateError(errors, message = '') {
    return new Impl(errors, message)
  },
  {
    getPolyfill: desc(require('./polyfill')),
    implementation: desc(Impl),
    shim: desc(require('./shim'))
  }
)
