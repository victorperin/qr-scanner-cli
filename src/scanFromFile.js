const Jimp = require('jimp')

const { readFile } = require('./infrastructure/fs')
const { greenBox } = require('./infrastructure/boxen')
const readQR = require('./infrastructure/qrcode-reader')

const logWithGreenBox = text =>
  console.log( greenBox(text) )

const extractBitmap = ({ bitmap }) => bitmap

const scanFromFile = (filePath, flags) =>
  Promise.resolve(filePath)
    .then(readFile)
    .then(Jimp.read)
    .then(extractBitmap)
    .then(readQR)
    .then( flags.clear ? console.log : logWithGreenBox )
    .catch(console.error)

module.exports = scanFromFile
