#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const yargs = require('yargs')

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

// needs review
const printModules = (modules) => {
    log(chalk.cyanBright('--------------------------------\n|         Module List          |\n--------------------------------'));
    for(let i = 0; i < modules.length; i++){
        log(`${i + 1}. ${modules[i].name} [${modules[i].path}]`);
    }
    log();
}

const isUniqueString = (name) => {
    return name.includes('uniqueString(')
}

const printModuleAnalytics = (modules) => {
    log(chalk.cyanBright('--------------------------------\n|       Module Analytics       |\n--------------------------------'));
    
    log('> Total Modules: ', modules.length);

    const existingNames = []
    const duplicateNames = []

    for (let i = 0; i < modules.length; i++){
        if (isUniqueString(modules[i].name)){
            continue
        }

        if (existingNames.includes(modules[i].name)){
            duplicateNames.push(modules[i].name)
        }
        existingNames.push(modules[i].name)
    }

    const namesAreUnique = duplicateNames.length === 0;

    log('> Module Names are Unique? ', namesAreUnique)

    if (!namesAreUnique){
        log('> Duplicate Module Names')
        duplicateNames.forEach(x => log(`   [*] ${x}`))
    }
}
  
const printDeploymentAnalytics = (modules) => {
    //printModules(modules)
    printModuleAnalytics(modules)
}

//log(figlet.textSync('armate'))

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

printDeploymentAnalytics(getModulesFromTemplate(filePath))