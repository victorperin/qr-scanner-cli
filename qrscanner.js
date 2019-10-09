const Jimp = require('jimp')
const boxen = require('boxen')
const fs = require('fs')
const QrCode = require('qrcode-reader')

const printOutput = (result, clear) => {
  if (clear) {
    console.log(result)
    return
  }

  console.log(
    boxen(result, {
      padding: 1,
      borderStyle: 'double',
      borderColor: 'green',
    }),
  )
}

const printErrorOutput = (error, clear) => {
  if (clear) {
    console.error(error)
    return
  }

  console.error(
    boxen(error, {
      padding: 1,
      borderStyle: 'double',
      borderColor: 'red',
    }),
  )
}

function qrScanner(cli) {
  const inputFile = cli.input[0]
  const { clear } = cli.flags

  if (!inputFile) {
    cli.showHelp(1)
  }

  const buffer = fs.readFileSync(inputFile)
  Jimp.read(buffer, (err, image) => {
    if (err) {
      printErrorOutput(err.message, clear)
      return
    }
    const qr = new QrCode()
    qr.callback = (callbackError, value) => {
      if (callbackError) {
        printErrorOutput(callbackError, clear)
        return
      }
      console.log(value)
      printOutput(value.result, clear)
    }
    qr.decode(image.bitmap)
  })
}

module.exports = qrScanner
