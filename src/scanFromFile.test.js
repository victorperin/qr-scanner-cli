const Jimp = require('jimp')
const clipboardy = require('clipboardy')
const open = require('open')
const qrReader = require('./infrastructure/qrcode-reader')
const boxen = require('./infrastructure/boxen')
const errorHandler = require('./handlers/error')

const scanFromFile = require('./scanFromFile')

jest.mock('jimp')
jest.mock('clipboardy')
jest.mock('./infrastructure/qrcode-reader')
jest.mock('./infrastructure/boxen')
jest.mock('open')
jest.mock('./handlers/error')

beforeEach(() => {
  Jimp.read.mockResolvedValue({ bitmap: 'FAKE BITMAP' })
  qrReader.mockResolvedValue('FAKE QR CONTENT')
  boxen.greenBox.mockReturnValue('FAKE BOX')
  clipboardy.writeSync.mockResolvedValue('FAKE CLIPBOARD')
  errorHandler.scanFromFile.mockResolvedValue('FAKE ERROR')
})

afterEach(jest.restoreAllMocks)

test('should pass on happy path', async () => {
  jest.spyOn(global.console, 'log').mockReturnValue()

  await scanFromFile('FAKE PATH', {})

  expect(Jimp.read).toBeCalledWith('FAKE PATH')
  expect(qrReader).toBeCalledWith('FAKE BITMAP')
  expect(boxen.greenBox).toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).toBeCalledWith('FAKE BOX')

  expect(clipboardy.writeSync).not.toBeCalledWith('FAKE QR CONTENT')
})

test('should copy to clipboard if flag is present', async () => {
  jest.spyOn(global.console, 'log').mockReturnValue()

  await scanFromFile('FAKE PATH', { clipboard: true })

  expect(Jimp.read).toBeCalledWith('FAKE PATH')
  expect(qrReader).toBeCalledWith('FAKE BITMAP')
  expect(boxen.greenBox).toBeCalledWith('FAKE QR CONTENT')

  expect(clipboardy.writeSync).toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).toBeCalledWith('FAKE BOX')
})

test('should output without box if clear flag is present', async () => {
  jest.spyOn(global.console, 'log').mockReturnValue()

  await scanFromFile('FAKE PATH', { clear: true })

  expect(Jimp.read).toBeCalledWith('FAKE PATH')
  expect(qrReader).toBeCalledWith('FAKE BITMAP')
  expect(boxen.greenBox).not.toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).not.toBeCalledWith('FAKE BOX')

  expect(clipboardy.writeSync).not.toBeCalledWith('FAKE QR CONTENT')
})

test('should execute flags (clear, clipboard)', async () => {
  jest.spyOn(global.console, 'log').mockReturnValue()

  await scanFromFile('FAKE PATH', { clear: true, clipboard: true })

  expect(Jimp.read).toBeCalledWith('FAKE PATH')
  expect(qrReader).toBeCalledWith('FAKE BITMAP')
  expect(boxen.greenBox).not.toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).not.toBeCalledWith('FAKE BOX')

  expect(clipboardy.writeSync).toBeCalledWith('FAKE QR CONTENT')
})

test('should execute open with --open', async () => {
  jest.spyOn(global.console, 'log').mockReturnValue()
  open.mockResolvedValue('FAKE RESULT')

  await scanFromFile('FAKE PATH', { open: true })

  expect(Jimp.read).toBeCalledWith('FAKE PATH')
  expect(qrReader).toBeCalledWith('FAKE BITMAP')
  expect(boxen.greenBox).toBeCalledWith('FAKE QR CONTENT')
  expect(open).toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).toBeCalledWith('FAKE BOX')
})
