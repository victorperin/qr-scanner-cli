const QrCode = require('qrcode-reader')

const readQR = imageBitmap =>
  new Promise((resolve, reject) => {
    const qr = new QrCode()

    qr.callback = (error, value) => {
      if (error) return reject(new Error(error))

      return resolve(value.result)
    }

    qr.decode(imageBitmap)
  })

module.exports = readQR
