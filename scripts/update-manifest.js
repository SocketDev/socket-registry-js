'use strict'

const path = require('node:path')

const fs = require('fs-extra')
const { PackageURL } = require('packageurl-js')
const prettier = require('prettier')
const { glob: tinyGlob } = require('tinyglobby')

const { localCompare } = require('./utils')

const rootPath = path.resolve(__dirname, '..')
const relPackagesPath = 'packages'
const absPackagesPath = path.join(rootPath, relPackagesPath)

;(async () => {
  const ecosystems = await tinyGlob(['*/'], {
    cwd: absPackagesPath,
    onlyDirectories: true,
    expandDirectories: false
  })
  const manifest = {}
  for (const eco_ of ecosystems) {
    const eco = eco_.replace(/[/\\]$/, '')
    if (eco === 'npm') {
      const absEcoPath = path.join(absPackagesPath, eco)
      const packages = []
      const pkgJsonGlob = await tinyGlob(['*/package.json'], {
        absolute: true,
        cwd: absEcoPath
      })
      for await (const pkgJsonPath of pkgJsonGlob) {
        const pkgJSON = await fs.readJSON(pkgJsonPath)
        const { browser, engines, name, socket, version } = pkgJSON
        const purlObj = PackageURL.fromString(`pkg:${eco}/${name}@${version}`)
        const data = [purlObj.toString()]
        const metaEntries = [
          ...(browser ? [['browser', true]] : []),
          ...(engines ? [['engines', engines]] : []),
          ...(socket ? Object.entries(socket) : [])
        ]
        if (metaEntries.length) {
          data[1] = Object.fromEntries(
            metaEntries.sort((a, b) => localCompare(a[0], b[0]))
          )
        }
        packages.push(data.length === 1 ? data[0] : data)
      }
      if (packages.length) {
        manifest[eco] = packages.sort((a_, b_) => {
          const a = Array.isArray(a_) ? a_[0] : a_
          const b = Array.isArray(b_) ? b_[0] : b_
          return localCompare(a, b)
        })
      }
    }
  }
  const output = await prettier.format(JSON.stringify(manifest), {
    parser: 'json'
  })
  await fs.writeFile(path.join(rootPath, 'manifest.json'), output, 'utf8')
})()
