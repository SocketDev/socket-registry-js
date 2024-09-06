'use strict'

module.exports = Reflect.getPrototypeOf(
  Reflect.getPrototypeOf(Reflect.getPrototypeOf((async function* () {})()))
)
