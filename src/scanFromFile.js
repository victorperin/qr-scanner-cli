const errorHandlers = require('./handlers/error')
const { getBitmap } = require('./infrastructure/jimp')
const { readFile } = require('./infrastructure/fs')
const readQR = require('./infrastructure/qrcode-reader')
const { outputText, doFlagClipboard, doOpen } = require('./handlers/flags')

const scanFromFile = (filePath, flags) =>
  Promise.resolve(filePath)
    .then(readFile)
    .then(getBitmap)
    .then(readQR)
    .then(doFlagClipboard(flags))
    .then(doOpen(flags))
    .then(outputText(flags))
    .catch(errorHandlers.scanFromFile(filePath))

module.exports = scanFromFile
