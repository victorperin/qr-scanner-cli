const Jimp = require('jimp')

const extractBitmap = ({ bitmap }) => bitmap

const getBitmap = filePath =>
  Promise.resolve(filePath)
    .then(Jimp.read)
    .then(extractBitmap)

module.exports = {
  getBitmap,
}
