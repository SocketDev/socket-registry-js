'use strict'

const impl = require('./implementation')
const desc = value => ({
  __proto__: null,
  configurable: true,
  writable: true,
  value
})

module.exports = Object.defineProperties(
  function from(object) {
    return impl(object)
  },
  {
    getPolyfill: desc(require('./polyfill')),
    implementation: desc(Impl),
    shim: desc(require('./shim'))
  }
)
