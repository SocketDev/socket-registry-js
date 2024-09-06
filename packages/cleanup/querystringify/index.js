'use strict'

function parse(query) {
  if (typeof query !== 'string' || query.length === 0) {
    return {}
  }
  return Object.fromEntries(
    new URLSearchParams(
      query.charCodeAt(0) === 35 /*'#'*/ ? query.slice(1) : query
    ).entries()
  )
}

function stringify(obj, prefix = '') {
  const params =
    obj !== null && typeof obj === 'object'
      ? new URLSearchParams(obj).toString()
      : ''
  if (params.length === 0) {
    return ''
  }
  let maybePrefix = ''
  if (typeof prefix === 'string') {
    maybePrefix = prefix
  } else if (prefix) {
    maybePrefix = '?'
  }
  return `${maybePrefix}${params}`
}

module.exports = {
  stringify,
  parse
}
