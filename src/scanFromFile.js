const Jimp = require('jimp')
const errorHandlers = require('./error-handlers')

const { readFile } = require('./infrastructure/fs')
const readQR = require('./infrastructure/qrcode-reader')
const { outputText, doFlagClipboard, doOpen } = require('./flag-handlers')

const extractBitmap = ({ bitmap }) => bitmap

const scanFromFile = (filePath, flags) =>
  Promise.resolve(filePath)
    .then(readFile)
    .then(Jimp.read)
    .then(extractBitmap)
    .then(readQR)
    .then(doFlagClipboard(flags))
    .then(doOpen(flags))
    .then(outputText(flags))
    .catch(errorHandlers.scanFromFile(filePath))

module.exports = scanFromFile
