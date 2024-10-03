'use strict'

const util = require('node:util')

const YAML = require('@zkochan/js-yaml')
const fs = require('fs-extra')
const readYamlFile = require('read-yaml-file')

const constants = require('@socketregistry/scripts/constants')
const {
  ENV,
  TAP_TIMEOUT,
  TAP_WIN_32_TIMEOUT,
  WIN_32,
  parseArgsConfig,
  tapCiConfigPath,
  tapConfigPath
} = constants
const { isModified } = require('@socketregistry/scripts/utils/git')

const { values: cliArgs } = util.parseArgs(parseArgsConfig)

;(async () => {
  // Exit early if no relevant files have been modified.
  if (!cliArgs.force && !ENV.CI && !(await isModified(tapConfigPath))) {
    return
  }
  const config = await readYamlFile(tapConfigPath)
  const content = `# This file is auto-generated by 'npm run update:tap-config'\n${YAML.dump(
    {
      ...config,
      passes: true,
      reporter: 'base',
      timeout: Math.max(
        WIN_32 ? TAP_WIN_32_TIMEOUT : TAP_TIMEOUT,
        config.timeout || 0
      )
    }
  )}`
  await fs.writeFile(tapCiConfigPath, content, 'utf8')
})()
