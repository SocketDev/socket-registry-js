'use strict'

const EMPTY_FILE = '/* empty */'
const LICENSE_ID = 'MIT'
const NPM_ORG = 'socketregistry'
const NPM_SCOPE = `@${NPM_ORG}`
const REPO_ORG = 'SocketDev'
const REPO_NAME = 'socket-registry-js'
const VERSION = '1.0.0'

const { compare: localCompare } = new Intl.Collator()

function capitalize(str) {
  const { length } = str
  if (length === 0) return str
  if (length === 1) return str.toUpperCase()
  return str[0].toUpperCase() + str.slice(1)
}

function createPackageJson(pkgName, pkgPath, options = {}) {
  const {
    engines,
    dependencies,
    files,
    nodeBranch,
    overrides,
    version = VERSION
  } = options
  return {
    name: `${NPM_SCOPE}/${pkgName}`,
    version,
    license: LICENSE_ID,
    repository: {
      type: 'git',
      url: `https://github.com/${REPO_ORG}/${REPO_NAME}`,
      directory: pkgPath
    },
    ...(nodeBranch ? { browser: './index.js' } : {}),
    main: `${nodeBranch ? './node.js' : './index.js'}`,
    sideEffects: false,
    ...(dependencies ? { dependencies } : {}),
    ...(overrides ? { overrides, resolutions: overrides } : {}),
    ...(engines ? { engines } : {}),
    files: files ?? ['*.d.ts', '*.js']
  }
}

function formatJsSrc(src) {
  const trimmed = src.trim()
  return trimmed.length ? `'use strict'\n\n${trimmed}\n` : `${EMPTY_FILE}\n`
}

module.exports = {
  capitalize,
  createPackageJson,
  formatJsSrc,
  localCompare
}
