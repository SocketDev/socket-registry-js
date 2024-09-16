'use strict'

const impl = require('./implementation')
const IteratorPrototype = require('../Iterator.prototype/implementation')
const { isIteratorNextCheckBuggy } = require('../shared')

module.exports = function getPolyfill() {
  return isIteratorNextCheckBuggy ? impl : IteratorPrototype.flatMap
}
