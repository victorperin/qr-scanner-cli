const Jimp = require('jimp')
const open = require('open')
const clipboardy = require('clipboardy')

const { readFile } = require('./infrastructure/fs')
const { greenBox } = require('./infrastructure/boxen')
const readQR = require('./infrastructure/qrcode-reader')

const extractBitmap = ({ bitmap }) => bitmap

const outputText = (text, flags) => {
  const output = flags.clear ? text : greenBox(text)

  console.log(output)
}

const doFlagClipboard = (text, flags) => {
  if (flags.clipboard) {
    clipboardy.writeSync(text)
  }

  return text
}

const doOpen = (text, flags) => {
  if (flags.open) {
    open(text)
  }
  return text
}

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
    .then(t => doFlagClipboard(t, flags))
    .then(t => doOpen(t, flags))
    .then(t => outputText(t, flags))
    .catch(errorHandler(filePath))

module.exports = scanFromFile
