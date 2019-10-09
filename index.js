#! /usr/bin/env node
const Jimp = require('jimp')
const fs = require('fs')
const QrCode = require('qrcode-reader')

const buffer = fs.readFileSync(process.argv[2])
Jimp.read(buffer, (err, image) => {
  if (err) {
    console.error(err)
    // TODO handle error
  }
  const qr = new QrCode()
  qr.callback = (callbackError, value) => {
    if (callbackError) {
      console.error(callbackError)
      // TODO handle error
    }

    console.log(value.result)
  }
  qr.decode(image.bitmap)
})
