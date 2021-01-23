import { read } from 'jimp'
import { Bitmap, Image } from '@jimp/core'

const extractBitmap = (image: Image): Bitmap => image.bitmap

export const getBitmap = (filePath: string): Promise<Bitmap> =>
  Promise.resolve(filePath).then(read).then(extractBitmap)

export default {
  getBitmap,
}
