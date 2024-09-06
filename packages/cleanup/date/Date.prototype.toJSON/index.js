'use strict'

const impl = require('./implementation')

module.exports = function toJSON(date) {
  return Reflect.apply(impl, date, [])
}
