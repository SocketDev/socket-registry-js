'use strict'

const impl = require('./implementation')

module.exports = function toString(date) {
  return Reflect.apply(impl, date, [])
}
