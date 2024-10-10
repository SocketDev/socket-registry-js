'use strict'

const path = require('node:path')

const semver = require('semver')

const constants = require('@socketregistry/scripts/constants')
const { npmPackagesPath, relNpmPackagesPath, rootPath } = constants
const { runScript } = require('@socketregistry/scripts/utils/npm')
const {
  fetchPackageManifest,
  readPackageJson
} = require('@socketregistry/scripts/utils/packages')
const { pEach } = require('@socketregistry/scripts/utils/promises')
const { Spinner } = require('@socketregistry/scripts/utils/spinner')

;(async () => {
  const spinner = new Spinner(
    `Bumping ${relNpmPackagesPath} versions (semver patch)...`
  ).start()
  // Chunk package names to process them in parallel 3 at a time.
  // Lazily access constants.ecosystems.
  await pEach(constants.npmPackageNames, 3, async regPkgName => {
    const pkgPath = path.join(npmPackagesPath, regPkgName)
    if (await fetchPackageManifest(regPkgName)) {
      const editablePkgJson = await readPackageJson(pkgPath, {
        editable: true
      })
      editablePkgJson.update({
        version: semver.inc(editablePkgJson.content.version, 'patch')
      })
      await editablePkgJson.save()
    }
  })
  spinner.stop()

  const spawnOptions = {
    cwd: rootPath,
    stdio: 'inherit'
  }
  await runScript('update:manifest', [], spawnOptions)
  await runScript('update:package-json', [], spawnOptions)
  await runScript(
    'update:longtask:test:npm:package-json',
    ['--', '--quiet', '--force'],
    spawnOptions
  )
})()