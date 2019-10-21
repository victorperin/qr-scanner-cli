const Jimp = require('jimp')
const fs = require('./infrastructure/fs')
const qrReader = require('./infrastructure/qrcode-reader')

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
})

afterEach(jest.restoreAllMocks)

test('should pass on happy path', async () => {
  await scanFromFile('FAKE PATH', {})

  expect(fs.readFile).toBeCalledWith('FAKE PATH')
  expect(Jimp.read).toBeCalledWith('FAKE FILE CONTENT')
  expect(qrReader).toBeCalledWith('FAKE BITMAP')
})

test('should console.error if readFile fails', async () => {
  fs.readFile.mockRejectedValue('FAKE ERROR')
  expect.assertions(2)
  try {
    await scanFromFile('FAKE PATH', {})
  } catch (error) {
    expect(error).toEqual('FAKE ERROR')
  }

  expect(fs.readFile).toBeCalledWith('FAKE PATH')
})
