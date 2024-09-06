'use strict'

const impl = require('./implementation')

module.exports = function getUTCMonth(date) {
  return Reflect.apply(impl, date, [])
}
