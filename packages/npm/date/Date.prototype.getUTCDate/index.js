'use strict'

const impl = require('./implementation')

module.exports = function getUTCDate(date) {
  return Reflect.apply(impl, date, [])
}
