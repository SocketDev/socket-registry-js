import assert from 'node:assert/strict'
import path from 'node:path'
import { describe, it } from 'node:test'

import fs from 'fs-extra'
import semver from 'semver'

const nodeVer = process.versions.node
const rootPath = path.resolve(__dirname, '..')
const packagesPath = path.join(rootPath, 'packages')

const shimApiKeys = ['getPolyfill', 'implementation', 'shim']
const findLeakedApiKey = (keys: any[]) =>
  shimApiKeys.find(k => keys.includes(k))

describe('Packages', async () => {
  const category = await fs.opendir(packagesPath)
  for await (const cat of category) {
    if (cat.isDirectory()) {
      const absCategoryPath = path.join(packagesPath, cat.name)
      const packages = await fs.opendir(absCategoryPath)
      for await (const pack of packages) {
        if (pack.isDirectory()) {
          const pkgName = pack.name
          describe(`${pkgName}:`, async () => {
            const absPkgPath = `${absCategoryPath}/${pkgName}`
            const pkgJsonPath = path.join(absPkgPath, 'package.json')
            const indexPath = path.join(absPkgPath, 'index.js')

            const filenames: string[] = []
            const folderItems = await fs.opendir(absPkgPath)
            for await (const item of folderItems) {
              if (item.isFile()) {
                filenames.push(item.name)
              }
            }

            it('should have a .d.ts file for every .js file', () => {
              const jsFiles = filenames
                .filter(n => n.endsWith('.js'))
                .map(n => n.slice(0, -3))
                .sort()
              const dtsFiles = filenames
                .filter(n => n.endsWith('.d.ts'))
                .map(n => n.slice(0, -5))
                .sort()
              assert.deepEqual(jsFiles, dtsFiles)
            })

            const implBasename = 'implementation.js'
            const polyBasename = 'polyfill.js'
            const isEsShimLike =
              filenames.includes(implBasename) &&
              filenames.includes(polyBasename)
            if (isEsShimLike) {
              const pkgJson = require(pkgJsonPath)
              const nodeRange = pkgJson?.engines?.node
              const shouldSkip = nodeRange
                ? !semver.satisfies(nodeVer, nodeRange)
                : false

              ;(shouldSkip ? it.skip : it)('es-shim', async () => {
                const polyPath = path.join(absPkgPath, polyBasename)
                const getPolyfill = require(polyPath)
                const beforeKeys = Reflect.ownKeys(getPolyfill())
                const maybeLeakBefore = findLeakedApiKey(beforeKeys)
                assert.ok(
                  !maybeLeakBefore,
                  `leaking BEFORE index.js required ('${maybeLeakBefore}')`
                )

                const main = require(indexPath)
                const afterKeys = Reflect.ownKeys(getPolyfill())
                assert.deepEqual(
                  afterKeys,
                  beforeKeys,
                  'leaking AFTER index.js required'
                )

                const mainKeys = Reflect.ownKeys(main)
                const mainHasAllApiKeys = shimApiKeys.every(k =>
                  mainKeys.includes(k)
                )
                assert.ok(mainHasAllApiKeys, 'index.js exported es-shim api')
              })
            }
          })
        }
      }
    }
  }
})
