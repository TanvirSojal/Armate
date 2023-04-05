#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const yargs = require('yargs')
const figlet = require('figlet')
const { getResourcesFromTemplate, getDeployments } = require('./library/utils/armUtils')
const { printResourceAnalytics, printModuleAnalytics } = require('./library/analytics')

const log = console.log

const argv = yargs
  .usage('Usage: [file]')
  .demandCommand(1)
  .argv;

const fileName = argv._[0]

const filePath = path.resolve(fileName);

if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${fileName}`);
  process.exit(1);
}

log(figlet.textSync('armate', {
    font: 'Isometric3'
}))

log(chalk.yellowBright('\n[pre-relase version]\n\n'))

const printAnalytics = (filePath) => {
    const resources = getResourcesFromTemplate(filePath)
    printResourceAnalytics(resources)

    const deploymentModules = getDeployments(resources)
    printModuleAnalytics(deploymentModules)
}

printAnalytics(filePath)