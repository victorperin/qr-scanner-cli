import QrCode from 'qrcode-reader'

export const readQR = imageBitmap =>
  new Promise((resolve, reject) => {
    const qr = new QrCode()

    qr.callback = (error, value) => {
      if (error) return reject(error)

      return resolve(value.result)
    }

    qr.decode(imageBitmap)
  })
