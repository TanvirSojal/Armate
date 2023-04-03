const Resource = require('./resource')

class Deployment extends Resource {
    constructor(name, apiVersion){
        super(name, 'Microsoft.Resources/deployments', apiVersion)
    }
}

module.exports = Deployment;