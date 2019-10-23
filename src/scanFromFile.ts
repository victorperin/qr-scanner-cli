import * as clipboardy from 'clipboardy'
import { readFile } from './infrastructure/fs'
import { greenBox } from './infrastructure/boxen'
import { readQR } from './infrastructure/qrcode-reader'
// See: https://github.com/oliver-moran/jimp/issues/803
import Jimp from 'jimp'
// tslint:disable-next-line: no-var-requires
const jimp: Jimp = require('jimp')

const extractBitmap = ({ bitmap }) => bitmap

const outputText = (text, flags) => {
  const output = flags.clear ? text : greenBox(text)

  console.log(output)
}

const doFlagClipboard = (text, flags) => {
  if (flags.clipboard) {
    clipboardy.writeSync(text)
  }

  return text
}

export const scanFromFile = (filePath, flags) =>
  Promise.resolve(filePath)
    .then(readFile)
    .then(jimp.read)
    .then(extractBitmap)
    .then(readQR)
    .then(t => doFlagClipboard(t, flags))
    .then(t => outputText(t, flags))
    .catch(console.error)
