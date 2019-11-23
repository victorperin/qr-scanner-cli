const Jimp = require('jimp')

const { readFile } = require('./infrastructure/fs')
const readQR = require('./infrastructure/qrcode-reader')
const { outputText, doFlagClipboard, doOpen } = require('./flag-handlers')

const extractBitmap = ({ bitmap }) => bitmap

const errorHandler = filePath => error => {
  if (typeof error === 'string' && error.includes('0 patterns found'))
    throw new Error('[WARNING] No pattern could be found! Is there a QR-Code?')

  if (error.message.includes('no such file or directory'))
    throw new Error(`[ERROR] File <${filePath}> not found!`)

  throw error
}

const scanFromFile = (filePath, flags) =>
  Promise.resolve(filePath)
    .then(readFile)
    .then(Jimp.read)
    .then(extractBitmap)
    .then(readQR)
    .then(doFlagClipboard(flags))
    .then(doOpen(flags))
    .then(outputText(flags))
    .catch(errorHandler(filePath))

module.exports = scanFromFile
