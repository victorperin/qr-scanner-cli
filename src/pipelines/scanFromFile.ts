import errorHandlers from '../handlers/error'
import { getBitmap } from '../infrastructure/jimp'
import readQR from '../infrastructure/qrcode-reader'
import { outputText, doFlagClipboard, doOpen } from '../handlers/flags'
import { Flags } from '../cli/flags'

export const scanFromFile = (filePath: string, flags: Flags): Promise<string> =>
  Promise.resolve(filePath)
    .then(getBitmap)
    .then(readQR)
    .then(doFlagClipboard(flags))
    .then(doOpen(flags))
    .catch(errorHandlers.scanFromFile(filePath))

export const scanFromFileOnCli = (filePath: string, flags: Flags): Promise<void> =>
  scanFromFile(filePath, flags).then(outputText(flags))
