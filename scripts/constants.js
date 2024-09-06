'use strict'

const lowerToCamelCase = [
  'AggregateError',
  'allSettled',
  'ArrayBuffer',
  'codePointAt',
  'endsWith',
  'findLast',
  'findLastIndex',
  'flatMap',
  'forEach',
  'fromCodePoint',
  'fromEntries',
  'getOwnPropertyDescriptors',
  'getPrototypeOf',
  'globalThis',
  'groupBy',
  'hasOwn',
  'matchAll',
  'ownKeys',
  'padEnd',
  'padStart',
  'RegExp',
  'replaceAll',
  'startsWith',
  'toSorted',
  'toReversed',
  'trimEnd',
  'trimLeft',
  'trimRight',
  'trimStart',
  'TypedArray'
].reduce(
  (o, v) => {
    o[v.toLowerCase()] = v
    return o
  },
  { __proto__: null }
)

module.exports = {
  lowerToCamelCase
}
