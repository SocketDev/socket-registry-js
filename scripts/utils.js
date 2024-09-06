'use strict'

const EMPTY_FILE = '/* empty */'
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
    name: `@socketregistry/${pkgName}`,
    version,
    license: 'MIT',
    repository: {
      type: 'git',
      url: 'https://github.com/SocketDev/socket-registry-js',
      directory: pkgPath
    },
    ...{
      ...(nodeBranch ? { browser: './index.js' } : {})
    },
    main: `${nodeBranch ? './node.js' : './index.js'}`,
    sideEffects: false,
    ...{
      ...(dependencies ? { dependencies } : {})
    },
    ...{
      ...(overrides ? { overrides, resolutions: overrides } : {})
    },
    ...{
      ...(engines ? { engines } : {})
    },
    files: files ?? ['*.d.ts', '*.js']
  }
}

function formatJsSrc(src) {
  return `'use strict'\n\n${src.trim() || EMPTY_FILE}\n`
}

module.exports = {
  capitalize,
  createPackageJson,
  formatJsSrc,
  localCompare
}
