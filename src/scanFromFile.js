const Jimp = require('jimp')
const clipboardy = require('clipboardy')

const { readFile } = require('./infrastructure/fs')
const { greenBox } = require('./infrastructure/boxen')
const readQR = require('./infrastructure/qrcode-reader')

const extractBitmap = ({ bitmap }) => bitmap

const outputText = (text, flags) => {
  const output = flags.clear
    ? text
    : greenBox(text)

  console.log(output)
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
    .then(t => doFlagClipboard(t, flags))
    .then(t => outputText(t, flags))
    .catch(console.error)

module.exports = scanFromFile
