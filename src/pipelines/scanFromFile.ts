import errorHandlers from '../handlers/error'
import { getBitmap } from '../infrastructure/jimp'
import readQR from '../infrastructure/qrcode-reader'
import { outputText, doFlagClipboard, doOpen } from '../handlers/flags'
import { Flags } from '../cli/flags'

/**
 * This function reads a file, get it's bitmap, searches and read a qrcode from it.
 * ```
 * const value = await scanFromFile('./image.jpg')
 * ```
 *
 * @param filePath A file path for an image file containing a QR Code
 * @param flags
 * @returns Value read from the QR Code inside the image
 */
export const scanFromFile = (filePath: string, flags?: Flags): Promise<string> =>
  Promise.resolve(filePath)
    .then(getBitmap)
    .then(readQR)
    .then(doFlagClipboard(flags || {}))
    .then(doOpen(flags || {}))
    .catch(errorHandlers.scanFromFile(filePath))

export const scanFromFileOnCli = (filePath: string, flags: Flags): Promise<void> =>
  scanFromFile(filePath, flags).then(outputText(flags))
