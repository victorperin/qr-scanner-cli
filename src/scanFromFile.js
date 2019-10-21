const Jimp = require('jimp')

const { readFile } = require('./infrastructure/fs')
const readQR = require('./infrastructure/qrcode-reader')

const extractBitmap = ({ bitmap }) => bitmap

const scanFromFile = filePath =>
  Promise.resolve(filePath)
    .then(readFile)
    .then(Jimp.read)
    .then(extractBitmap)
    .then(readQR)

module.exports = scanFromFile
