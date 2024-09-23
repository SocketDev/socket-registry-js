'use strict'

function defineProperties(object, map, predicates = {}) {
  const props = Reflect.ownKeys(map)
  for (let i = 0, { length } = props; i < length; i += 1) {
    const name = props[i]
    const value = map[props[i]]
    if (name in object) {
      const predicate = predicates[props[i]]
      if (predicate === true) {
        if (object[name] === value) {
          continue
        }
      } else if (typeof predicate !== 'function' || !predicate()) {
        continue
      }
    }
    Object.defineProperty(object, name, {
      __proto__: null,
      configurable: true,
      enumerable: false,
      value,
      writable: true
    })
  }
}

defineProperties.supportsDescriptors = true

module.exports = defineProperties