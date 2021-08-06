import errorHandlers from '../handlers/error'
import readQR from '../infrastructure/qrcode-reader'
import { doFlagClipboard, doOpen } from '../handlers/flags'
import { Flags } from '../cli/flags'
import { Bitmap } from '@jimp/core'

/**
 * You can pass a jimp Bitmap, this functions reads it's content and tries to find a QR Code, returning it's result
 *
 * ```javascript
 * import Jimp from 'jimp'
 *
 * const bitmap = Jimp.read('./image.jpg')
 * const value = await scanFromBitmap(bitmap)
 * ```
 *
 * @param bitmap A Bitmap object
 * @param flags
 * @returns Value read from the QR Code inside the image
 */
export const scanFromBitmap = (bitmap: Bitmap, flags?: Flags): Promise<string> =>
  Promise.resolve(bitmap)
    .then(readQR)
    .then(doFlagClipboard(flags || {}))
    .then(doOpen(flags || {}))
    .catch(errorHandlers.scanFromBitmap)
