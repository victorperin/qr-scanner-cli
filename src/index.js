const scanFromFile = require('./scanFromFile')

const qrScanner = filePath => scanFromFile(filePath)

module.exports = qrScanner
