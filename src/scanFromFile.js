/**
 * @type {import('jimp').default}
 */
// @ts-ignore
const Jimp = require('jimp')
const clipboardy = require('clipboardy')
const { readFile } = require('./infrastructure/fs')
const { greenBox } = require('./infrastructure/boxen')
const readQR = require('./infrastructure/qrcode-reader')

/**
 *
 * @param {{bitmap:import('jimp').default['bitmap']}} param0
 */
const extractBitmap = ({ bitmap }) => bitmap

/**
 * @param {string} text
 * @param {import('./cli/flags').exports} flags
 */
const outputText = (text, flags) => {
  const output = flags.clear ? text : greenBox(text)

  console.log(output)
}

/**
 *
 * @param {string} text
 * @param {import('./cli/flags').exports} flags
 */
const doFlagClipboard = (text, flags) => {
  if (flags.clipboard) {
    clipboardy.writeSync(text)
  }

  return text
}

/**
 *
 * @param {string} filePath
 * @param {import('./cli/flags').exports} flags
 */
const scanFromFile = (filePath, flags) =>
  Promise.resolve(filePath)
    .then(readFile)
    .then(buffer => buffer.toString())
    .then(Jimp.read)
    .then(extractBitmap)
    .then(readQR)
    .then(t => doFlagClipboard(t, flags))
    .then(t => outputText(t, flags))
    .catch(console.error)

module.exports = scanFromFile
