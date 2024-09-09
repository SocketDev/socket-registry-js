'use strict'

const impl = require('./implementation')

module.exports = function getDate(date) {
  return Reflect.apply(impl, date, [])
}
