'use strict'

const impl = require('./implementation')
const desc = value => ({
  __proto__: null,
  configurable: true,
  writable: true,
  value
})

module.exports = Object.defineProperties(Promise.allSettled.bind(Promise), {
  getPolyfill: desc(require('./polyfill')),
  implementation: desc(impl),
  shim: desc(require('./shim'))
})
