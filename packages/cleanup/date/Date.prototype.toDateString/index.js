'use strict'

const impl = require('./implementation')

module.exports = function toDateString(date) {
  return Reflect.apply(impl, date, [])
}
