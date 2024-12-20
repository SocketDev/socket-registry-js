'use strict'

const { readFileSync } = require('node:fs')
const path = require('node:path')

const { includeIgnoreFile } = require('@eslint/compat')
const prettier = require('prettier')
const whichFn = require('which')

const registryConstants = require('@socketsecurity/registry/lib/constants')

const { sync: whichSyncFn } = whichFn

const {
  ESLINT_CONFIG_JS,
  EXTENSIONS_JSON,
  GIT_IGNORE,
  LICENSE,
  MANIFEST_JSON,
  NODE_MODULES,
  NODE_WORKSPACES,
  PACKAGE_JSON,
  PACKAGE_LOCK,
  PRETTIER_IGNORE,
  PRETTIER_RC,
  README_MD,
  REGISTRY,
  TSCONFIG_JSON,
  kInternalsSymbol,
  [kInternalsSymbol]: { createConstantsObject, readDirNamesSync }
} = registryConstants

const rootPath = path.resolve(__dirname, '..')
const rootLicensePath = path.join(rootPath, LICENSE)
const rootEslintConfigPath = path.join(rootPath, ESLINT_CONFIG_JS)
const rootNodeModulesPath = path.join(rootPath, NODE_MODULES)
const rootNodeModulesBinPath = path.join(rootNodeModulesPath, '.bin')
const rootPackageJsonPath = path.join(rootPath, PACKAGE_JSON)
const rootPackageLockPath = path.join(rootPath, PACKAGE_LOCK)
const rootPackagesPath = path.join(rootPath, 'packages')
const rootTsConfigPath = path.join(rootPath, TSCONFIG_JSON)

const gitIgnorePath = path.join(rootPath, GIT_IGNORE)
const prettierConfigPath = path.join(rootPath, PRETTIER_RC)
const prettierIgnorePath = path.join(rootPath, PRETTIER_IGNORE)
const registryPkgPath = path.join(rootPath, REGISTRY)
const registryExtensionsJsonPath = path.join(registryPkgPath, EXTENSIONS_JSON)
const registryManifestJsonPath = path.join(registryPkgPath, MANIFEST_JSON)
const templatesPath = path.join(__dirname, 'templates')

const tapCiConfigPath = path.join(rootPath, '.tapci.yaml')
const tapConfigPath = path.join(rootPath, '.taprc')

const npmPackagesPath = path.join(rootPackagesPath, 'npm')
const npmTemplatesPath = path.join(templatesPath, 'npm')
const npmTemplatesReadmePath = path.join(npmTemplatesPath, README_MD)

const perfNpmPath = path.join(rootPath, 'perf/npm')
const perfNpmFixturesPath = path.join(perfNpmPath, 'fixtures')

const testNpmPath = path.join(rootPath, 'test/npm')
const testNpmFixturesPath = path.join(testNpmPath, 'fixtures')
const testNpmNodeModulesPath = path.join(testNpmPath, NODE_MODULES)
const testNpmNodeWorkspacesPath = path.join(testNpmPath, NODE_WORKSPACES)
const testNpmPkgJsonPath = path.join(testNpmPath, PACKAGE_JSON)
const testNpmPkgLockPath = path.join(testNpmPath, PACKAGE_LOCK)

const yarnPkgExtsPath = path.join(rootNodeModulesPath, '@yarnpkg/extensions')
const yarnPkgExtsJsonPath = path.join(yarnPkgExtsPath, PACKAGE_JSON)

const relNpmPackagesPath = path.relative(rootPath, npmPackagesPath)
const relPackagesPath = path.relative(rootPath, rootPackagesPath)
const relRegistryPkgPath = path.relative(rootPath, registryPkgPath)
const relRegistryManifestJsonPath = path.relative(
  rootPath,
  registryManifestJsonPath
)
const relTestNpmPath = path.relative(rootPath, testNpmPath)
const relTestNpmNodeModulesPath = path.relative(
  rootPath,
  testNpmNodeModulesPath
)

const defaultWhichOptions = {
  __proto__: null,
  path: `${rootNodeModulesBinPath}${path.delimiter}${process.env.PATH}`
}

const which = function which(cmd, options) {
  return whichFn(cmd, { __proto__: null, ...defaultWhichOptions, ...options })
}

const whichSync = function whichSync(cmd, options) {
  return whichSyncFn(cmd, {
    __proto__: null,
    ...defaultWhichOptions,
    ...options
  })
}

const LAZY_LICENSE_CONTENT = () => readFileSync(rootLicensePath, 'utf8')
const lazyEcosystems = () => Object.freeze(readDirNamesSync(rootPackagesPath))
const lazyGitExecPath = () => whichSync('git')
const lazyIgnoreGlobs = () =>
  Object.freeze([
    ...new Set([
      // Most of these ignored files can be included specifically if included in the
      // files globs. Exceptions to this are:
      // https://docs.npmjs.com/cli/v10/configuring-npm/package-json#files
      // These can not be included.
      '.git',
      '.npmrc',
      '**/node_modules',
      '**/package-lock.json',
      '**/pnpm-lock.ya?ml',
      '**/yarn.lock',
      // Lazily access constants.gitIgnoreFile.
      ...constants.gitIgnoreFile.ignores
    ])
  ])
const lazyNpmPackageNames = () =>
  Object.freeze(readDirNamesSync(npmPackagesPath))
const lazyGitIgnoreFile = () => includeIgnoreFile(gitIgnorePath)
const lazyPrettierConfigPromise = () =>
  prettier.resolveConfig(prettierConfigPath, { editorconfig: true })
const lazyPrettierIgnoreFile = () => includeIgnoreFile(prettierIgnorePath)
const lazyTapRunExecPath = () => whichSync('tap-run')
const lazyTsxExecPath = () => whichSync('tsx')

const constants = createConstantsObject(
  {
    // Lazily defined values are initialized as `undefined` to
    // keep their key order.
    LICENSE_CONTENT: undefined,
    ecosystems: undefined,
    gitExecPath: undefined,
    gitIgnoreFile: undefined,
    kInternalsSymbol,
    ignoreGlobs: undefined,
    npmPackageNames: undefined,
    npmPackagesPath,
    npmTemplatesPath,
    npmTemplatesReadmePath,
    perfNpmPath,
    perfNpmFixturesPath,
    prettierConfigPromise: undefined,
    prettierIgnoreFile: undefined,
    registryExtensionsJsonPath,
    registryManifestJsonPath,
    registryPkgPath,
    relNpmPackagesPath,
    relPackagesPath,
    relRegistryManifestJsonPath,
    relRegistryPkgPath,
    relTestNpmPath,
    relTestNpmNodeModulesPath,
    rootEslintConfigPath,
    rootLicensePath,
    rootNodeModulesPath,
    rootPackageJsonPath,
    rootPackageLockPath,
    rootPackagesPath,
    rootPath,
    rootTsConfigPath,
    tapCiConfigPath,
    tapConfigPath,
    tapRunExecPath: undefined,
    templatesPath,
    testNpmPath,
    testNpmFixturesPath,
    testNpmNodeModulesPath,
    testNpmNodeWorkspacesPath,
    testNpmPkgJsonPath,
    testNpmPkgLockPath,
    tsxExecPath: undefined,
    yarnPkgExtsPath,
    yarnPkgExtsJsonPath
  },
  {
    getters: {
      LICENSE_CONTENT: LAZY_LICENSE_CONTENT,
      ecosystems: lazyEcosystems,
      gitExecPath: lazyGitExecPath,
      gitIgnoreFile: lazyGitIgnoreFile,
      ignoreGlobs: lazyIgnoreGlobs,
      npmPackageNames: lazyNpmPackageNames,
      prettierConfigPromise: lazyPrettierConfigPromise,
      prettierIgnoreFile: lazyPrettierIgnoreFile,
      tapRunExecPath: lazyTapRunExecPath,
      tsxExecPath: lazyTsxExecPath
    },
    internals: {
      which,
      whichSync
    },
    mixin: registryConstants
  }
)
module.exports = constants
