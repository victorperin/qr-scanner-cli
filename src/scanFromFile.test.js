const Jimp = require('jimp')
const clipboardy = require('clipboardy')
const { readFile } = require('../dist/infrastructure/fs')
const { readQR } = require('../dist/infrastructure/qrcode-reader')
const { greenBox } = require('../dist/infrastructure/boxen')

const { scanFromFile } = require('../dist/scanFromFile')

jest.mock('jimp')
jest.mock('clipboardy')
jest.mock('../dist/infrastructure/fs')
jest.mock('../dist/infrastructure/qrcode-reader')
jest.mock('../dist/infrastructure/boxen')

beforeEach(() => {
  readFile.mockResolvedValue('FAKE FILE CONTENT')
  Jimp.read.mockResolvedValue({ bitmap: 'FAKE BITMAP' })
  readQR.mockResolvedValue('FAKE QR CONTENT')
  greenBox.mockReturnValue('FAKE BOX')
  clipboardy.writeSync.mockResolvedValue('FAKE CLIPBOARD')
})

afterEach(jest.restoreAllMocks)

test('should pass on happy path', async () => {
  jest.spyOn(global.console, 'log').mockReturnValue()

  await scanFromFile('FAKE PATH', {})

  expect(readFile).toBeCalledWith('FAKE PATH')
  expect(Jimp.read).toBeCalledWith('FAKE FILE CONTENT')
  expect(readQR).toBeCalledWith('FAKE BITMAP')
  expect(greenBox).toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).toBeCalledWith('FAKE BOX')

  expect(clipboardy.writeSync).not.toBeCalledWith('FAKE QR CONTENT')
})

test('should console.error if readFile fails', async () => {
  readFile.mockRejectedValue('FAKE ERROR')
  jest.spyOn(global.console, 'error').mockReturnValue()

  await scanFromFile('FAKE PATH', {})

  expect(readFile).toBeCalledWith('FAKE PATH')
  expect(console.error).toBeCalledWith('FAKE ERROR')
})

test('should copy to clipboard if flag is present', async () => {
  jest.spyOn(global.console, 'log').mockReturnValue()

  await scanFromFile('FAKE PATH', { clipboard: true })

  expect(readFile).toBeCalledWith('FAKE PATH')
  expect(Jimp.read).toBeCalledWith('FAKE FILE CONTENT')
  expect(readQR).toBeCalledWith('FAKE BITMAP')
  expect(greenBox).toBeCalledWith('FAKE QR CONTENT')

  expect(clipboardy.writeSync).toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).toBeCalledWith('FAKE BOX')
})

test('should output without box if clear flag is present', async () => {
  jest.spyOn(global.console, 'log').mockReturnValue()

  await scanFromFile('FAKE PATH', { clear: true })

  expect(readFile).toBeCalledWith('FAKE PATH')
  expect(Jimp.read).toBeCalledWith('FAKE FILE CONTENT')
  expect(readQR).toBeCalledWith('FAKE BITMAP')
  expect(greenBox).not.toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).not.toBeCalledWith('FAKE BOX')

  expect(clipboardy.writeSync).not.toBeCalledWith('FAKE QR CONTENT')
})

test('should execute flags (clear, clipboard)', async () => {
  jest.spyOn(global.console, 'log').mockReturnValue()

  await scanFromFile('FAKE PATH', { clear: true, clipboard: true })

  expect(readFile).toBeCalledWith('FAKE PATH')
  expect(Jimp.read).toBeCalledWith('FAKE FILE CONTENT')
  expect(readQR).toBeCalledWith('FAKE BITMAP')
  expect(greenBox).not.toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).not.toBeCalledWith('FAKE BOX')

  expect(clipboardy.writeSync).toBeCalledWith('FAKE QR CONTENT')
})
