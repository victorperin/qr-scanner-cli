const Jimp = require('jimp')
const clipboardy = require('clipboardy')
const fs = require('./infrastructure/fs')
const qrReader = require('./infrastructure/qrcode-reader')
const boxen = require('./infrastructure/boxen')

const scanFromFile = require('./scanFromFile')

jest.mock('jimp')
jest.mock('clipboardy')
jest.mock('./infrastructure/fs')
jest.mock('./infrastructure/qrcode-reader')
jest.mock('./infrastructure/boxen')

beforeEach(() => {
  fs.readFile.mockResolvedValue('FAKE FILE CONTENT')
  Jimp.read.mockResolvedValue({ bitmap: 'FAKE BITMAP' })
  qrReader.mockResolvedValue('FAKE QR CONTENT')
  boxen.greenBox.mockReturnValue('FAKE BOX')
  clipboardy.writeSync.mockResolvedValue('FAKE CLIPBOARD')
})

afterEach(jest.restoreAllMocks)

test('should pass on happy path', async () => {
  jest.spyOn(global.console, 'log').mockReturnValue()

  await scanFromFile('FAKE PATH', {})

  expect(fs.readFile).toBeCalledWith('FAKE PATH')
  expect(Jimp.read).toBeCalledWith('FAKE FILE CONTENT')
  expect(qrReader).toBeCalledWith('FAKE BITMAP')
  expect(boxen.greenBox).toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).toBeCalledWith('FAKE BOX')

  expect(clipboardy.writeSync).not.toBeCalledWith('FAKE QR CONTENT')
})

test('should console.error if readFile fails', async () => {
  fs.readFile.mockRejectedValue('FAKE ERROR')
  jest.spyOn(global.console, 'error').mockReturnValue()

  await scanFromFile('FAKE PATH', {})

  expect(fs.readFile).toBeCalledWith('FAKE PATH')
  expect(console.error).toBeCalledWith('FAKE ERROR')
})

test('should copy to clipboard if flag is present', async () => {
  jest.spyOn(global.console, 'log').mockReturnValue()

  await scanFromFile('FAKE PATH', { clipboard: true })

  expect(fs.readFile).toBeCalledWith('FAKE PATH')
  expect(Jimp.read).toBeCalledWith('FAKE FILE CONTENT')
  expect(qrReader).toBeCalledWith('FAKE BITMAP')
  expect(boxen.greenBox).toBeCalledWith('FAKE QR CONTENT')

  expect(clipboardy.writeSync).toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).toBeCalledWith('FAKE BOX')
})

test('should output without box if clear flag is present', async () => {
  jest.spyOn(global.console, 'log').mockReturnValue()

  await scanFromFile('FAKE PATH', { clear: true })

  expect(fs.readFile).toBeCalledWith('FAKE PATH')
  expect(Jimp.read).toBeCalledWith('FAKE FILE CONTENT')
  expect(qrReader).toBeCalledWith('FAKE BITMAP')
  expect(boxen.greenBox).not.toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).not.toBeCalledWith('FAKE BOX')

  expect(clipboardy.writeSync).not.toBeCalledWith('FAKE QR CONTENT')
})
