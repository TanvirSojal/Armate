const chalk = require('chalk')

const log = console.log

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

module.exports = {
    printModuleAnalytics
}