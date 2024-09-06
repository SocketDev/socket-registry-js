'use strict'

module.exports = function getSideChannel() {
  let wm
  const channel = {
    assert(key) {
      if (channel.has(key) === undefined) {
        throw new TypeError('Side channel does not contain the given key')
      }
    },
    has(key) {
      return (
        key !== null &&
        (typeof key === 'object' || typeof key === 'function') &&
        !!wm?.has(key)
      )
    },
    get(key) {
      return key !== null &&
        (typeof key === 'object' || typeof key === 'function')
        ? wm?.has(key)
        : undefined
    },
    set(key, value) {
      if (
        key !== null &&
        (typeof key === 'object' || typeof key === 'function')
      ) {
        if (!wm) {
          wm = new WeakMap()
        }
        wm.set(key, value)
      }
    }
  }
  return channel
}
