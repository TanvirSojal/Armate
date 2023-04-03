const fs = require('fs')

const getFileFromPath = (templateFilePath) => JSON.parse(fs.readFileSync(templateFilePath, 'utf8'))

module.exports = {
    getFileFromPath
}