'use strict'

const { toString: fnToStr } = Function.prototype
const genFuncProto = function* () {}.prototype
const isFnRegex = /^\s*(?:function)?\*/

module.exports = function isGeneratorFunction(fn) {
  return (
    typeof fn === 'function' &&
    (isFnRegex.test(fnToStr.call(fn)) ||
      Reflect.getPrototypeOf(fn) === genFuncProto)
  )
}
