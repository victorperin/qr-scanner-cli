import errorHandlers from './handlers/error'
import { getBitmap } from './infrastructure/jimp'
import readQR from './infrastructure/qrcode-reader'
import { outputText, doFlagClipboard, doOpen } from './handlers/flags'

const scanFromFile = (filePath, flags) =>
  Promise.resolve(filePath)
    .then(getBitmap)
    .then(readQR)
    .then(doFlagClipboard(flags))
    .then(doOpen(flags))
    .then(outputText(flags))
    .catch(errorHandlers.scanFromFile(filePath))

export default scanFromFile
