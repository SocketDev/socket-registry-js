import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import path from 'node:path'
import { describe, it } from 'node:test'

import fs from 'fs-extra'
import { glob as tinyGlob } from 'tinyglobby'
const { PackageURL } = require('packageurl-js')
import semver from 'semver'
// @ts-ignore
import { isObjectObject } from '../scripts/utils'

const extJs = '.js'
const extDts = '.d.ts'
const nodeVer = process.versions.node

const rootPath = path.resolve(__dirname, '..')
const relPackagesPath = 'packages'
const absPackagesPath = path.join(rootPath, relPackagesPath)
const overridesDir = 'overrides/'

const shimApiKeys = ['getPolyfill', 'implementation', 'shim']
const findLeakedApiKey = (keys: any[]) =>
  shimApiKeys.find(k => keys.includes(k))

const isDotFile = (filepath: string) => path.basename(filepath).startsWith('.')
const isDotPattern = (pattern: string) => pattern.startsWith('.')

const stripDotSlash = (filepath: string) => filepath.replace(/^\.\//, '')

describe('Ecosystems', async () => {
  const ecosystems = await tinyGlob(['*/'], {
    cwd: absPackagesPath,
    onlyDirectories: true,
    expandDirectories: false
  })
  for (const eco_ of ecosystems) {
    const eco = eco_.replace(/[/\\]$/, '')
    describe(`${eco}:`, async () => {
      if (eco === 'npm') {
        const absEcoPath = path.join(absPackagesPath, eco)
        const pkgJsonGlob = await tinyGlob(['*/package.json'], {
          absolute: true,
          cwd: absEcoPath
        })
        for await (const pkgJsonPath of pkgJsonGlob) {
          const pkgJSON = await fs.readJSON(pkgJsonPath)
          const {
            name,
            browser: browserPath,
            main: mainPath,
            files: filesPatterns,
            overrides: pkgOverrides,
            resolutions: pkgResolutions,
            version
          } = pkgJSON
          const purlObj = PackageURL.fromString(`pkg:${eco}/${name}@${version}`)
          const absPkgPath = `${absEcoPath}/${purlObj.name}`
          const indexPath = path.join(absPkgPath, 'index.js')
          const req = createRequire(indexPath)
          const files = (
            await tinyGlob(['**/*'], {
              cwd: absPkgPath,
              dot: true,
              onlyFiles: true
            })
          ).sort()
          const filesPatternsAsArray = Array.isArray(filesPatterns)
            ? filesPatterns
            : []
          const filesFieldMatches = (
            await tinyGlob(
              [
                ...filesPatternsAsArray,
                'package.json',
                'LICEN[CS]E{.*,}',
                'README{.*,}'
              ],
              {
                cwd: absPkgPath,
                dot: true,
                onlyFiles: true
              }
            )
          ).sort()
          const dotFilePatterns = filesPatternsAsArray.filter(isDotPattern)
          const dotFileMatches = (
            await tinyGlob(dotFilePatterns, {
              cwd: absPkgPath,
              dot: true,
              onlyFiles: true
            })
          ).sort()
          const jsonFiles = files
            .filter(n => path.extname(n) === '.json')
            .sort()

          describe(`${name}:`, async () => {
            it('file exists for "main" field of package.json', async () => {
              assert.doesNotThrow(() =>
                req.resolve(`./${stripDotSlash(mainPath)}`)
              )
            })

            if (browserPath) {
              it('file exists for "browser" field of package.json', async () => {
                assert.doesNotThrow(() =>
                  req.resolve(`./${stripDotSlash(browserPath)}`)
                )
              })
            }

            if (jsonFiles.length) {
              it('should have valid .json files', async () => {
                for (const relJsonPath of jsonFiles) {
                  await assert.doesNotReject(
                    fs.readJson(req.resolve(`./${relJsonPath}`))
                  )
                }
              })
            }

            it('should have a LICENSE file', () => {
              assert.ok(files.includes('LICENSE'))
            })

            it('should have a .d.ts file for every .js file', async () => {
              const jsFiles = files
                .filter(n => n.endsWith(extJs) && !n.startsWith(overridesDir))
                .map(n => n.slice(0, -extJs.length))
                .sort()
              const dtsFiles = files
                .filter(n => n.endsWith(extDts))
                .map(n => n.slice(0, -extDts.length))
                .sort()
              assert.deepEqual(jsFiles, dtsFiles)
            })

            it('should have a "files" field in package.json', async () => {
              assert.ok(
                Array.isArray(filesPatterns) &&
                  filesPatterns.length > 0 &&
                  filesPatterns.every(n => typeof n === 'string')
              )
            })

            it('package files should match "files" field', async () => {
              const filesToCompare = files.filter(
                n => !isDotFile(n) || dotFileMatches.includes(n)
              )
              assert.deepEqual(filesFieldMatches, filesToCompare)
            })

            const implPath = path.join(absPkgPath, 'implementation.js')
            const polyPath = path.join(absPkgPath, 'polyfill.js')
            const isEsShimLike =
              fs.existsSync(implPath) && fs.existsSync(polyPath)

            if (isEsShimLike) {
              describe('es-shim', async () => {
                const pkgJson = require(pkgJsonPath)
                const nodeRange = pkgJson?.engines?.node
                const skipping = nodeRange
                  ? !semver.satisfies(nodeVer, nodeRange)
                  : false
                const skipMessage = skipping
                  ? `supported in ${nodeRange}, running ${nodeVer}`
                  : ''

                it('index.js exists for "main" field of package.json', async () => {
                  assert.doesNotThrow(() =>
                    req.resolve(`./${stripDotSlash(mainPath)}`)
                  )
                })

                it('should not leak api', async t => {
                  if (skipping) return t.skip(skipMessage)
                  const getPolyfill = require(polyPath)
                  const beforeKeys = Reflect.ownKeys(getPolyfill())
                  const maybeLeakBefore = findLeakedApiKey(beforeKeys)
                  assert.ok(
                    !maybeLeakBefore,
                    `leaking BEFORE index.js required ('${maybeLeakBefore}')`
                  )
                  require(indexPath)
                  const afterKeys = Reflect.ownKeys(getPolyfill())
                  assert.deepEqual(
                    afterKeys,
                    beforeKeys,
                    'leaking AFTER index.js required'
                  )
                })

                it('implementation.js exports es-shim api', async t => {
                  if (skipping) return t.skip(skipMessage)
                  const main = req(mainPath)
                  const mainKeys = Reflect.ownKeys(main)
                  assert.ok(shimApiKeys.every(k => mainKeys.includes(k)))
                })

                it('getPolyfill() === implementation', async t => {
                  if (skipping) return t.skip(skipMessage)
                  assert.strictEqual(require(polyPath)(), require(implPath))
                })
              })
            }

            const localOverridesFiles = files.filter(
              n => n.startsWith(overridesDir) && filesFieldMatches.includes(n)
            )
            const hasOverrides =
              !!pkgOverrides ||
              !!pkgResolutions ||
              localOverridesFiles.length > 0

            if (hasOverrides) {
              const localOverridesPackages = localOverridesFiles.map(n =>
                n.slice(
                  overridesDir.length,
                  n.indexOf('/', overridesDir.length)
                )
              )

              it('should have overrides and resolutions fields in package.json', () => {
                assert.ok(isObjectObject(pkgOverrides))
                assert.deepEqual(pkgOverrides, pkgResolutions)
              })

              it('should have overrides directory', () => {
                assert.ok(localOverridesFiles.length > 0)
              })

              it('overrides files should match corresponding package.json field values', () => {
                for (const name of localOverridesPackages) {
                  assert.strictEqual(
                    pkgOverrides[name],
                    `file:./overrides/${name}`
                  )
                }
              })
            }
          })
        }
      }
    })
  }
})
