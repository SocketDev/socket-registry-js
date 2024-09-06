'use strict'

const descriptionGetter = Symbol.prototype.__lookupGetter__('description')

module.exports = function getSymbolDescription(sym) {
  return descriptionGetter.call(sym)
}
