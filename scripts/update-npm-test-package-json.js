'use strict'

const path = require('node:path')
const util = require('node:util')

const spawn = require('@npmcli/promise-spawn')
const fs = require('fs-extra')
const { glob: tinyGlob } = require('tinyglobby')

const {
  LICENSE_GLOB_PATTERN,
  NODE_WORKSPACES,
  PACKAGE_JSON,
  README_GLOB_PATTERN,
  ignores,
  lifecycleScriptNames,
  npmExecPath,
  npmPackageNames,
  npmPackagesPath,
  rootPath,
  testNpmNodeModulesHiddenLockPath,
  testNpmNodeModulesPath,
  testNpmNodeWorkspacesPath,
  testNpmPath,
  testNpmPkgJsonPath,
  testNpmPkgLockPath
} = require('@socketregistry/scripts/constants')
const { arrayChunk } = require('@socketregistry/scripts/utils/arrays')
const {
  isSymbolicLinkSync,
  move,
  readPackageJson,
  uniqueSync
} = require('@socketregistry/scripts/utils/fs')
const { parsePackageSpec } = require('@socketregistry/scripts/utils/packages')
const { splitPath } = require('@socketregistry/scripts/utils/path')
const { pEach, pEachChunk } = require('@socketregistry/scripts/utils/promises')
const { Spinner } = require('@socketregistry/scripts/utils/spinner')
const { isNonEmptyString } = require('@socketregistry/scripts/utils/strings')

const { values: cliArgs } = util.parseArgs({
  options: {
    add: {
      type: 'string',
      multiple: true
    },
    force: {
      type: 'boolean',
      short: 'f'
    }
  }
})

const cleanTestScript = testScript =>
  testScript
    // Strip actions BEFORE and AFTER the test runner is invoked.
    .replace(
      /^.*?(\b(?:ava|jest|node|npm run|mocha|tape?)\b.*?)(?:&.+|$)/,
      '$1'
    )
    // Remove unsupported Node flag "--es-staging"
    .replace(/(?<=node)(?: +--[-\w]+)+/, m => m.replaceAll(' --es-staging', ''))
    .trim()

const createStubEsModule = srcPath => {
  const relPath = `./${path.basename(srcPath)}`
  return `export * from '${relPath}'\nexport { default } from '${relPath}'\n`
}

const gitTagRefUrl = (user, project, tag) =>
  `https://api.github.com/repos/${user}/${project}/git/ref/tags/${tag}`

const tgzUrl = (user, project, sha) =>
  `https://github.com/${user}/${project}/archive/${sha}.tar.gz`

const getRepoUrlDetails = (repoUrl = '') => {
  const userAndRepo = repoUrl.replace(/^.+github.com\//, '').split('/')
  const { 0: user } = userAndRepo
  const project =
    userAndRepo.length > 1 ? userAndRepo[1].slice(0, -'.git'.length) : ''
  return { user, project }
}

const installTestNpmNodeModules = async pkgName => {
  await Promise.all([
    fs.remove(testNpmPkgLockPath),
    fs.remove(testNpmNodeModulesHiddenLockPath)
  ])
  const args = ['install', '--silent']
  if (typeof pkgName === 'string') {
    args.push('--save-dev', pkgName)
  }
  return await spawn(npmExecPath, args, { cwd: testNpmPath })
}

const editablePackageJsonCache = { __proto__: null }
const readCachedEditablePackageJson = async filepath_ => {
  const filepath = filepath_.endsWith(PACKAGE_JSON)
    ? filepath_
    : path.join(filepath_, PACKAGE_JSON)
  const cached = editablePackageJsonCache[filepath]
  if (cached) return cached
  const result = await readPackageJson(filepath, { editable: true })
  editablePackageJsonCache[filepath] = result
  return result
}

const testScripts = [
  // Order is significant. First in, first tried.
  'mocha',
  'specs',
  'tests-only',
  'test:readable-stream-only',
  'test'
]

;(async () => {
  const workspaceExists = fs.existsSync(testNpmNodeWorkspacesPath)
  const nmExists = fs.existsSync(testNpmNodeModulesPath)

  // Exit early if nothing to do.
  if (
    workspaceExists &&
    nmExists &&
    !(cliArgs.force || Array.isArray(cliArgs.add))
  ) {
    return
  }

  // Chunk package names to process them in parallel 3 at a time.
  const allPackageNameChunks = arrayChunk(npmPackageNames, 3)
  const packageNameChunks = cliArgs.add
    ? arrayChunk([...npmPackageNames, ...cliArgs.add], 3)
    : allPackageNameChunks

  const relTestNpmPath = path.relative(rootPath, testNpmPath)
  const relTestNpmNodeModulesPath = path.relative(
    rootPath,
    testNpmNodeModulesPath
  )
  let modifiedTestNpmPkgJson = false
  let testNpmEditablePkgJson = await readPackageJson(testNpmPkgJsonPath, {
    editable: true
  })

  // Initialize test/npm/node_modules
  {
    const spinner = new Spinner(
      `Initializing ${relTestNpmNodeModulesPath}...`
    ).start()
    if (nmExists) {
      // Remove existing packages to re-install.
      const pkgNames = cliArgs.add ?? npmPackageNames
      await Promise.all(
        pkgNames.map(n => fs.remove(path.join(testNpmNodeModulesPath, n)))
      )
    }
    try {
      await installTestNpmNodeModules()
      testNpmEditablePkgJson = await readPackageJson(testNpmPkgJsonPath, {
        editable: true
      })
      spinner.stop(`✔ Initialized ${relTestNpmNodeModulesPath}`)
    } catch (e) {
      spinner.stop('✘ Initialization encountered an error:', e)
    }
  }

  // Resolve test/npm/package.json "devDependencies" data.
  {
    const unresolved = []
    await pEachChunk(packageNameChunks, async pkgName => {
      const devDepExists =
        typeof testNpmEditablePkgJson.content.devDependencies?.[pkgName] ===
        'string'
      const nmPkgPath = path.join(testNpmNodeModulesPath, pkgName)
      const nmPkgPathExists = fs.existsSync(nmPkgPath)
      // Missing packages can occur if the script is stopped part way through
      if (!devDepExists || !nmPkgPathExists) {
        // A package we expect to be there is missing or corrupt. Reinstall it.
        if (nmPkgPathExists) {
          await fs.remove(nmPkgPath)
        }
        const spinner = new Spinner(`Reinstalling ${pkgName}...`).start()
        try {
          await installTestNpmNodeModules(pkgName)
          testNpmEditablePkgJson = await readPackageJson(testNpmPkgJsonPath, {
            editable: true
          })
          spinner.stop(
            devDepExists
              ? `✔ Reinstalled ${pkgName}`
              : `✔ --save-dev ${pkgName} to package.json`
          )
        } catch {
          spinner.stop(
            devDepExists
              ? `✘ Failed to reinstall ${pkgName}`
              : `✘ Failed to --save-dev ${pkgName} to package.json`
          )
        }
      }
      const pkgSpec = testNpmEditablePkgJson.content.devDependencies?.[pkgName]
      const parsedSpec = parsePackageSpec(
        pkgName,
        pkgSpec,
        testNpmNodeModulesPath
      )
      const isTarball =
        parsedSpec.type === 'remote' &&
        !!parsedSpec.saveSpec?.endsWith('.tar.gz')
      const isGithubUrl =
        parsedSpec.type === 'git' &&
        parsedSpec.hosted?.domain === 'github.com' &&
        isNonEmptyString(parsedSpec.gitCommittish)
      if (
        // We don't need to resolve the tarball URL if the devDependencies
        // value is already one.
        !isTarball &&
        // We'll convert the easier to read GitHub URL with a #tag into the tarball URL.
        (isGithubUrl ||
          // Search for the presence of test files anywhere in the package.
          // The glob pattern ".{[cm],}[jt]s" matches .js, .cjs, .cts, .mjs, .mts, .ts file extensions.
          (
            await tinyGlob(
              [
                '**/test{s,}{.{[cm],}[jt]s,}',
                '**/*.{spec,test}{.{[cm],}[jt]s}'
              ],
              {
                cwd: nmPkgPath,
                onlyFiles: false
              }
            )
          ).length === 0)
      ) {
        // When tests aren't included in the installed package we convert the
        // package version to a GitHub release tag, then we convert the release
        // tag to a sha, then finally we resolve the URL of the GitHub tarball
        // to use in place of the version range for its devDependencies entry.
        const nmEditablePkgJson = await readCachedEditablePackageJson(nmPkgPath)
        const { version: nmPkgVer } = nmEditablePkgJson.content
        const pkgId = `${pkgName}@${nmPkgVer}`
        const { user, project } = isGithubUrl
          ? parsedSpec.hosted
          : getRepoUrlDetails(nmEditablePkgJson.content.repository?.url)

        const spinner = new Spinner(
          `Resolving GitHub tarball URL for ${pkgId}...`
        ).start()
        let resolved = false
        if (user && project) {
          let apiUrl = ''
          if (isGithubUrl) {
            apiUrl = gitTagRefUrl(user, project, parsedSpec.gitCommittish)
          } else {
            // First try to resolve the sha for a tag starting with "v", e.g. v1.2.3.
            apiUrl = gitTagRefUrl(user, project, `v${nmPkgVer}`)
            if (!(await fetch(apiUrl, { method: 'head' })).ok) {
              // If a sha isn't found, try again with the "v" removed, e.g. 1.2.3.
              apiUrl = gitTagRefUrl(user, project, nmPkgVer)
              if (!(await fetch(apiUrl, { method: 'head' })).ok) {
                apiUrl = ''
              }
            }
          }
          if (apiUrl) {
            const resp = await fetch(apiUrl)
            const json = await resp.json()
            const sha = json?.object?.sha
            if (sha) {
              // Replace the dev dep version range with the tarball URL.
              resolved = true
              modifiedTestNpmPkgJson = true
              testNpmEditablePkgJson.update({
                devDependencies: {
                  ...testNpmEditablePkgJson.content.devDependencies,
                  [pkgName]: tgzUrl(user, project, sha)
                }
              })
            }
          }
        }
        if (!resolved) {
          // Collect the names and versions of packages we failed to resolve
          // tarballs for.
          unresolved.push({ name: pkgName, version: nmPkgVer })
        }
        spinner.stop()
      }
    })
    if (unresolved.length) {
      const msg = '⚠️ Unable to resolve tests for the following packages:'
      const unresolvedNames = unresolved.map(u => u.name)
      const unresolvedList =
        unresolvedNames.length === 1
          ? unresolvedNames[0]
          : `${unresolvedNames.slice(0, -1).join(', ')} and ${unresolvedNames.at(-1)}`
      const separator = msg.length + unresolvedList.length > 80 ? '\n' : ' '
      console.log(`${msg}${separator}${unresolvedList}`)
    }
  }

  // Update test/npm/node_modules if the test/npm/package.json "devDependencies"
  // field was modified.
  if (modifiedTestNpmPkgJson) {
    await testNpmEditablePkgJson.save()
    const spinner = new Spinner(
      `Updating ${relTestNpmNodeModulesPath}...`
    ).start()
    try {
      await installTestNpmNodeModules()
      testNpmEditablePkgJson = await readPackageJson(testNpmPkgJsonPath, {
        editable: true
      })
      spinner.stop(`✔ Updated ${relTestNpmNodeModulesPath}`)
    } catch (e) {
      spinner.stop('✘ Update encountered an error:', e)
    }
  }

  // Link files and cleanup package.json scripts of test/npm/node_modules packages.
  if (packageNameChunks.length) {
    const spinner = new Spinner(`Linking packages...`).start()
    await pEachChunk(packageNameChunks, async pkgName => {
      const pkgPath = path.join(npmPackagesPath, pkgName)
      const nmPkgPath = path.join(testNpmNodeModulesPath, pkgName)
      const nmPkgJsonPath = path.join(nmPkgPath, PACKAGE_JSON)
      const nmEditablePkgJson =
        await readCachedEditablePackageJson(nmPkgJsonPath)
      const { dependencies: nmPkgDeps } = nmEditablePkgJson.content
      const pkgJson = await readPackageJson(pkgPath)

      // Cleanup package scripts
      const scripts = nmEditablePkgJson.content.scripts ?? {}
      // Consolidate test script to script['test'].
      const testScriptName =
        testScripts.find(n => isNonEmptyString(scripts[n])) ?? 'test'
      scripts.test = scripts[testScriptName] ?? ''
      // Remove lifecycle and test script variants.
      nmEditablePkgJson.update({
        scripts: Object.fromEntries(
          Object.entries(scripts)
            .filter(
              ({ 0: key }) =>
                key === 'test' ||
                !(
                  key === testScriptName ||
                  key === 'lint' ||
                  key === 'prelint' ||
                  key === 'postlint' ||
                  key === 'pretest' ||
                  key === 'posttest' ||
                  lifecycleScriptNames.has(key)
                )
            )
            .map(pair => {
              const { 0: key, 1: value } = pair
              if (key.startsWith('test')) {
                pair[1] = cleanTestScript(value)
              }
              return pair
            })
        )
      })

      // Add dependencies and overrides of @socketregistry/xyz override package
      // as dependencies of the original xyz package.
      const { dependencies, overrides } = pkgJson
      if (dependencies ?? overrides) {
        const socketRegistryPrefix = 'npm:@socketregistry/'
        const overridesAsDeps =
          overrides &&
          Object.fromEntries(
            Object.entries(overrides).map(pair => {
              const { 1: value } = pair
              if (value.startsWith(socketRegistryPrefix)) {
                pair[1] = `file:../${value.slice(socketRegistryPrefix.length, value.lastIndexOf('@'))}`
              }
              return pair
            })
          )
        nmEditablePkgJson.update({
          dependencies: {
            ...nmPkgDeps,
            ...dependencies,
            ...overridesAsDeps
          }
        })
      }

      // Add engines field of the @socketregistry/xyz override package to the
      // original xyz package. If the value is `undefined` it will be removed
      // when saved as JSON.
      nmEditablePkgJson.update({
        engines: pkgJson.engines
      })

      // Symlink files from the @socketregistry/xyz override package to the
      // original xyz package.
      const isPkgTypeModule = pkgJson.type === 'module'
      const isNmPkgTypeModule = nmEditablePkgJson.content.type === 'module'
      const isModuleTypeMismatch = isNmPkgTypeModule !== isPkgTypeModule
      if (isModuleTypeMismatch) {
        spinner.message = `⚠️ ${pkgName}: Module type mismatch`
      }
      const actions = new Map()
      for (const jsFile of await tinyGlob(['**/*.{js,json}'], {
        ignore: ['**/package.json'],
        cwd: pkgPath
      })) {
        let targetPath = path.join(pkgPath, jsFile)
        let destPath = path.join(nmPkgPath, jsFile)
        const dirs = splitPath(path.dirname(jsFile))
        for (let i = 0, { length } = dirs; i < length; i += 1) {
          const crumbs = dirs.slice(0, i + 1)
          const destPathDir = path.join(nmPkgPath, ...crumbs)
          if (!fs.existsSync(destPathDir) || isSymbolicLinkSync(destPathDir)) {
            targetPath = path.join(pkgPath, ...crumbs)
            destPath = destPathDir
            break
          }
        }
        actions.set(destPath, async () => {
          if (isModuleTypeMismatch) {
            const destExt = path.extname(destPath)
            if (isNmPkgTypeModule && !isPkgTypeModule) {
              if (destExt === '.js') {
                // We can go from CJS by creating an ESM stub.
                const uniquePath = uniqueSync(`${destPath.slice(0, -3)}.cjs`)
                await fs.copyFile(targetPath, uniquePath)
                await fs.outputFile(
                  destPath,
                  createStubEsModule(uniquePath),
                  'utf8'
                )
                return
              }
            } else {
              console.log(`✘ ${pkgName}: Cannot convert ESM to CJS`)
            }
          }
          await fs.remove(destPath)
          await fs.ensureSymlink(targetPath, destPath)
        })
      }
      await pEach([...actions.values()], 3, a => a())
      await nmEditablePkgJson.save()
    })
    spinner.stop('✔ Packages linked')
  }

  // Tidy up override packages and move them from
  // test/npm/node_modules/ to test/npm/node_workspaces/
  {
    const spinner = new Spinner(
      `Tidying up ${relTestNpmPath} workspaces... (☕ break)`
    ).start()
    await pEachChunk(packageNameChunks, async n => {
      const srcPath = path.join(testNpmNodeModulesPath, n)
      const destPath = path.join(testNpmNodeWorkspacesPath, n)
      // Remove unnecessary directories/files.
      await Promise.all(
        (
          await tinyGlob(
            [
              '.package-lock.json',
              '**/.editorconfig',
              '**/.eslintignore',
              '**/.eslintrc.json',
              '**/.gitattributes',
              '**/.github',
              '**/.npmignore',
              '**/.npmrc',
              '**/.nvmrc',
              '**/.travis.yml',
              '**/*.md',
              '**/tslint.json',
              '**/doc{s,}/',
              '**/example{s,}/',
              '**/CHANGE{LOG,S}{.*,}',
              '**/CONTRIBUTING{.*,}',
              '**/FUND{ING,}{.*,}',
              `**/${README_GLOB_PATTERN}`,
              ...ignores
            ],
            {
              ignore: [`**/${LICENSE_GLOB_PATTERN}`],
              absolute: true,
              cwd: srcPath,
              dot: true,
              onlyFiles: false
            }
          )
        ).map(p => fs.remove(p))
      )
      // Move override package directory.
      await move(srcPath, destPath, { verbatimSymlinks: true })
    })
    spinner.stop('✔ Workspaces cleaned (so fresh and so clean, clean)')
  }

  // Reinstall test/npm/node_modules.
  {
    const spinner = new Spinner(
      `Installing ${relTestNpmPath} workspaces... (☕ break)`
    ).start()
    // Update "workspaces" field in test/npm/package.json.
    testNpmEditablePkgJson.update({
      workspaces: npmPackageNames.map(n => `${NODE_WORKSPACES}/${n}`)
    })
    await testNpmEditablePkgJson.save()
    // Finally install workspaces.
    try {
      await installTestNpmNodeModules()
      spinner.stop()
    } catch (e) {
      spinner.stop('✘ Installation encountered an error:', e)
    }
  }
  console.log('Finished 🎉')
})()
