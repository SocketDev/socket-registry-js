'use strict'

const path = require('node:path')

const constants = require('@socketregistry/scripts/constants')
const { ecosystems, rootPackageJsonPath, rootPackagesPath } = constants
const { readDirNames } = require('@socketregistry/scripts/utils/fs')
const { readPackageJson } = require('@socketregistry/scripts/utils/packages')

;(async () => {
  const rootEditablePkgJson = await readPackageJson(rootPackageJsonPath, {
    editable: true
  })
  // Update workspaces.
  const workspaces = []
  for (const eco of ecosystems) {
    const ecoPackagesPath = path.join(rootPackagesPath, eco)
    // No need to sort because readDirNames returns names sorted by default.
    const packageNames = await readDirNames(ecoPackagesPath)
    for (const pkgName of packageNames) {
      workspaces.push(`packages/${eco}/${pkgName}`)
    }
  }
  rootEditablePkgJson.update({ workspaces })
  // Lazily access constants.maintainedNodeVersions.
  const { maintainedNodeVersions } = constants
  const nodeVerNext = maintainedNodeVersions.get('next')
  const nodeVerCurr = maintainedNodeVersions.get('current')
  // Update engines field.
  rootEditablePkgJson.update({
    engines: { node: `^${nodeVerCurr} || >=${nodeVerNext}` }
  })
  rootEditablePkgJson.save()
})()
