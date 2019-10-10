const Jimp = require('jimp')
const clipboardy = require('clipboardy')

const { readFile } = require('./infrastructure/fs')
const { greenBox } = require('./infrastructure/boxen')
const readQR = require('./infrastructure/qrcode-reader')

const logWithGreenBox = text => console.log(greenBox(text))

const extractBitmap = ({ bitmap }) => bitmap

const doFlagClear = (text, flags) => {
  if (flags.clear) {
    console.log(text)
  }
  else {
    logWithGreenBox(text)
  }

  return text
}

const doFlagClipboard = (text, flags) => {
  if (flags.clipboard) {
    clipboardy.writeSync(text)
  }

  return text
}

const scanFromFile = (filePath, flags) =>
  Promise.resolve(filePath)
    .then(readFile)
    .then(Jimp.read)
    .then(extractBitmap)
    .then(readQR)
    .then(t => doFlagClear(t, flags))
    .then(t => doFlagClipboard(t, flags))
    .catch(console.error)

module.exports = scanFromFile
