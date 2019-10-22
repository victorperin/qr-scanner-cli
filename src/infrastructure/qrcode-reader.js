// @ts-ignore
const QrCode = require('qrcode-reader')

/**
 *
 * @param {import('jimp').default['bitmap']} imageBitmap
 * @return {Promise<string>}
 */
const readQR = imageBitmap =>
  new Promise((resolve, reject) => {
    const qr = new QrCode()

    /**
     * @param {Error} error
     * @param {{result:string}} value
     */
    qr.callback = (error, value) => {
      if (error) return reject(error)

      return resolve(value.result)
    }

    qr.decode(imageBitmap)
  })

module.exports = readQR
