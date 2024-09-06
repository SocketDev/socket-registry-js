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
      const categoryPath = path.join(packagesPath, cat.name)
      const pkgBasePath = path
        .relative(rootPath, categoryPath)
        .replace(/^[.\\/]+/, '')
      const packages = await fs.opendir(categoryPath)
      for await (const pack of packages) {
        if (pack.isDirectory()) {
          const pkgName = pack.name
          const pkgPath = `${pkgBasePath}/${pkgName}`
          const pkg = await fs.readJSON(path.join(pkgPath, 'package.json'))
          const { engines } = pkg
          const data = [pkgPath]
          if (engines) {
            data[1] = { engines }
          }
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
  await fs.writeJSON(path.join(rootPath, 'manifest.json'), manifest, {
    spaces: 2
  })
})()
