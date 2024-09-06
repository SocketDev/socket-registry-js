'use strict'

const path = require('node:path')

const fs = require('fs-extra')

const { localCompare } = require('./utils')

const rootPath = path.resolve(__dirname, '..')
const packagesPath = path.join(rootPath, 'packages')

;(async () => {
  const manifest = { packages: {} }
  const category = await fs.opendir(packagesPath)
  for await (const cat of category) {
    if (cat.isDirectory()) {
      const entries = []
      const absCategoryPath = path.join(packagesPath, cat.name)
      const relCategoryPath = path
        .relative(rootPath, absCategoryPath)
        .replace(/^[.\\/]+/, '')
      const packages = await fs.opendir(absCategoryPath)
      for await (const pack of packages) {
        if (pack.isDirectory()) {
          const pkgName = pack.name
          const relPkgPath = `${relCategoryPath}/${pkgName}`
          const absPkgPath = `${absCategoryPath}/${pkgName}`
          const pkgJSON = await fs.readJSON(
            path.join(absPkgPath, 'package.json')
          )
          const browser = !!pkgJSON.browser
          const { engines } = pkgJSON
          const data = [relPkgPath]

          let metadata
          if (browser) {
            if (metadata === undefined) metadata = {}
            metadata.browser = true
          }
          if (engines) {
            if (metadata === undefined) metadata = {}
            metadata.engines = engines
          }
          if (metadata) data[1] = metadata
          entries.push(data.length === 1 ? data[0] : data)
        }
      }
      if (entries.length) {
        manifest.packages[cat.name] = entries.sort((a_, b_) => {
          const a = Array.isArray(a_) ? a_[0] : a_
          const b = Array.isArray(b_) ? b_[0] : b_
          return localCompare(a, b)
        })
      }
    }
  }
  const jsonUTF = JSON.stringify(manifest, null, 2).replace(
    /(?<=\n)(?<indent>\s+)(?<block>\{[\s\S]*?\n\1\})/g,
    (match, indent, block) =>
      block.includes('"')
        ? `${indent}${JSON.stringify(JSON.parse(block))}`
        : match
  )
  await fs.writeFile(path.join(rootPath, 'manifest.json'), jsonUTF, 'utf8')
})()
