'use strict'

const impl = require('./implementation')

module.exports = function getUTCFullYear(date) {
  return Reflect.apply(impl, date, [])
}
