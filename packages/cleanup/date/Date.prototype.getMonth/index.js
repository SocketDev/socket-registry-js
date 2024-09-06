'use strict'

const impl = require('./implementation')

module.exports = function getMonth(date) {
  return Reflect.apply(impl, date, [])
}
