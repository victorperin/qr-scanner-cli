const Jimp = require('jimp')
const fs = require('./infrastructure/fs')
const qrReader = require('./infrastructure/qrcode-reader')
const boxen = require('./infrastructure/boxen')

const scanFromFile = require('./scanFromFile')

jest.mock('jimp')
jest.mock('./infrastructure/fs')
jest.mock('./infrastructure/qrcode-reader')
jest.mock('./infrastructure/boxen')

beforeEach(jest.restoreAllMocks)

test('should pass on happy path', async () => {
  fs.readFile.mockResolvedValue('FAKE FILE CONTENT')
  Jimp.read.mockResolvedValue({ bitmap: 'FAKE BITMAP' })
  qrReader.mockResolvedValue('FAKE QR CONTENT')
  boxen.greenBox.mockReturnValue('FAKE BOX')
  jest.spyOn(global.console, 'log').mockReturnValue()

  await scanFromFile('FAKE PATH', {})

  expect(fs.readFile).toBeCalledWith('FAKE PATH')
  expect(Jimp.read).toBeCalledWith('FAKE FILE CONTENT')
  expect(qrReader).toBeCalledWith('FAKE BITMAP')
  expect(boxen.greenBox).toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).toBeCalledWith('FAKE BOX')
})
