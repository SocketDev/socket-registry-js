'use strict'

const impl = require('./implementation')

module.exports = function getFullYear(date) {
  return Reflect.apply(impl, date, [])
}
