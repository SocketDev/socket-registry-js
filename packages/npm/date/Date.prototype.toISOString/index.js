'use strict'

const impl = require('./implementation')

module.exports = function toISOString(date) {
  return Reflect.apply(impl, date, [])
}
