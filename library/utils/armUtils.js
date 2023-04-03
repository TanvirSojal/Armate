const Resource = require("../model/resource")
const ResourceType = require("../data/resourceType")
const { getFileFromPath } = require('./fileUtils')

const getResources = (template) => {
    const result = []
    const dfs = (resources) => {
        resources.forEach((resource) => {
            result.push(new Resource(resource.name, resource.type, resource.apiVersion))
            if (resource.properties?.template?.resources){
                dfs(resource.properties.template.resources)
            }
        });
    }

    dfs(template.resources)
    return result
}

const getDeployments = (resources) => resources.filter(x => x.type === ResourceType.Deployment)

const getResourcesFromTemplate = (templateFilePath) => {
    const file = getFileFromPath(templateFilePath)
    return getResources(file)
}

module.exports = {
    getResourcesFromTemplate,
    getDeployments
}