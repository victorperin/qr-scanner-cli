import QrCode from 'qrcode-reader'
import { Bitmap } from '@jimp/core'

const readQR = (imageBitmap: Bitmap): Promise<string> =>
  new Promise((resolve, reject) => {
    const qr = new QrCode()

    qr.callback = (error: Error, value: { result: string }) => {
      if (error) return reject(error)

      return resolve(value.result)
    }

    qr.decode(imageBitmap)
  })

export default readQR
