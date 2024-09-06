'use strict'

const { toString: objToStr } = Object.prototype

function noop() {}

function dateProtoGetTime(date) {
  return date.getTime()
}

function mapOrSetProtoDelete(mos, key) {
  return mos.delete(key)
}

function mapOrSetProtoHas(mos, key) {
  return mos.has(key)
}

function mapOrSetProtoGet(mos, key) {
  return mos.get(key)
}

function mapOrSetProtoSize(mos) {
  return mos.size
}

function objectProtoToString(object) {
  return objToStr.call(object)
}

function sabProtoByteLength(sab) {
  return sab.byteLength
}

function setProtoAdd(set, value) {
  return set.add(value)
}

module.exports = function callBoundIntrinsic(name, _allowMissing) {
  switch (name) {
    case 'Date.prototype.getTime':
      return dateProtoGetTime
    case 'Map.prototype.has':
      return mapOrSetProtoHas
    case 'Map.prototype.get':
      return mapOrSetProtoGet
    case 'Map.prototype.size':
      return mapOrSetProtoSize
    case 'Object.prototype.toString':
      return objectProtoToString
    case 'SharedArrayBuffer.prototype.byteLength':
      return sabProtoByteLength
    case 'Set.prototype.add':
      return setProtoAdd
    case 'Set.prototype.delete':
      return mapOrSetProtoDelete
    case 'Set.prototype.has':
      return mapOrSetProtoHas
    case 'Set.prototype.size':
      return mapOrSetProtoSize
  }
  return noop
}
