'use strict'

const empty = []
// eslint-disable-next-line no-self-assign
empty.concat = empty.concat

function needsOverride(value) {
  const spreadable = value[Symbol.isConcatSpreadable]
  return spreadable !== undefined && !spreadable
}

module.exports = function safeArrayConcat(...args) {
  for (var i = 0, { length } = args; i < length; i += 1) {
    const arg = args[i]
    if (arg !== null && typeof arg === 'object' && needsOverride(arg)) {
      const array = Array.isArray(arg) ? Array.from(arg) : [arg]
      array[Symbol.isConcatSpreadable] = true
      arg[i] = array
    }
  }
  // Avoids V8 perf issue by only setting Symbol.isConcatSpreadable when needed.
  // https://issues.chromium.org/issues/42204235#comment4
  if (needsOverride(empty)) {
    empty[Symbol.isConcatSpreadable] = true
  }
  return empty.concat(...args)
}
