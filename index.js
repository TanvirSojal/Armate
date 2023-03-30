#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const yargs = require('yargs')
const figlet = require('figlet')

const log = console.log

class Module {
    constructor(name, path){
        this.name = name
        this.path = path
    }
}

const findModules = (resources) => {
    const modules = []

    const dfs = (resources, path) => {
        resources.forEach((resource) => {
            if (resource.type === 'Microsoft.Resources/deployments') {
                modules.push(new Module(resource.name, path))
                if (resource.properties.template.resources){
                    dfs(resource.properties.template.resources, `${path}/${resource.name}`)
                }
            } 
        });
    }

    dfs(resources, ".")

    return modules;
}

const getModulesFromTemplate = (templateFilePath) => {
    const template = JSON.parse(fs.readFileSync(templateFilePath, 'utf8'));
    const deployments = findModules(template.resources);
    return deployments;
}

const printModules = (modules) => {
    log(chalk.cyanBright('--------------------------------\n|         Module List          |\n--------------------------------'));
    for(let i = 0; i < modules.length; i++){
        log(`${i + 1}. ${modules[i].name} [${modules[i].path}]`);
    }
    log();
}

const printModuleAnalytics = (modules) => {
    log(chalk.cyanBright('--------------------------------\n|       Module Analytics       |\n--------------------------------'));
    
    log('> Total Modules:', modules.length);

    const existingNames = []
    const duplicateNames = new Set()

    for (let i = 0; i < modules.length; i++){
        if (existingNames.includes(modules[i].name)){
            duplicateNames.add(modules[i].name)
        }
        existingNames.push(modules[i].name)
    }

    const namesAreUnique = duplicateNames.size === 0;

    log('> Module Names are Unique? ', namesAreUnique)

    if (!namesAreUnique){
        log('> Duplicate Module Names:', duplicateNames.size)
        duplicateNames.forEach(x => log(`   [*] ${x}`))
    }
}
  
const printDeploymentAnalytics = (modules) => {
    printModuleAnalytics(modules)
}

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

printDeploymentAnalytics(getModulesFromTemplate(filePath))