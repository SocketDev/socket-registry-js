'use strict'

const impl = require('./implementation')

module.exports = function toUTCString(date) {
  return Reflect.apply(impl, date, [])
}
