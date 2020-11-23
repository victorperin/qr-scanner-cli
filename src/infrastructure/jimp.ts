import { read } from 'jimp'
import { Bitmap } from '@jimp/core'

const extractBitmap = ({ bitmap }): Bitmap => bitmap

export const getBitmap = (filePath: string): Promise<Bitmap> =>
  Promise.resolve(filePath).then(read).then(extractBitmap)

export default {
  getBitmap,
}
