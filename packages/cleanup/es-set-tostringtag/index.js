'use strict'

module.exports = function setToStringTag(object, value, options = {}) {
  if (options.force || !Object.hasOwn(object, Symbol.toStringTag)) {
    Object.defineProperty(object, Symbol.toStringTag, {
      __proto__: null,
      configurable: true,
      value
    })
  }
}
