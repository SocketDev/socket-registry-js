'use strict'

module.exports = function GetIntrinsic(name, _allowMissing) {
  return name === '%Set%' ? Set : undefined
}
