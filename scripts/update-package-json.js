'use strict'

const path = require('node:path')

const fs = require('fs-extra')
const { glob: tinyGlob } = require('tinyglobby')

const { createPackageJson } = require('./utils')

const rootPath = path.resolve(__dirname, '..')
const relPackagesPath = 'packages'
const absPackagesPath = path.join(rootPath, relPackagesPath)

;(async () => {
  const ecosystems = await tinyGlob(['*/'], {
    cwd: absPackagesPath,
    onlyDirectories: true,
    expandDirectories: false
  })
  for (const eco_ of ecosystems) {
    const eco = eco_.replace(/[/\\]$/, '')
    if (eco === 'npm') {
      const absEcoPath = path.join(absPackagesPath, eco)
      const relEcoPath = path.join(relPackagesPath, eco)
      const pkgJsonGlob = await tinyGlob(['*/package.json'], {
        absolute: true,
        cwd: absEcoPath
      })
      for await (const pkgJsonPath of pkgJsonGlob) {
        const pkgJSON = await fs.readJSON(pkgJsonPath)
        const { name } = pkgJSON
        const relPkgPath = `${relEcoPath}/${name}`
        const output = createPackageJson(name, relPkgPath, {
          ...pkgJSON
        })
        await fs.writeJSON(pkgJsonPath, output, { spaces: 2 })
      }
    }
  }
})()
