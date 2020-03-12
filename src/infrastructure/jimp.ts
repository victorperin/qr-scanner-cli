import Jimp from 'jimp'

const extractBitmap = ({ bitmap }) => bitmap

export const getBitmap = filePath =>
  Promise.resolve(filePath)
    .then(Jimp.read)
    .then(extractBitmap)

export default {
  getBitmap,
}
