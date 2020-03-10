import { mocked } from 'ts-jest/utils'
import jimp from './infrastructure/jimp'
import clipboardy from 'clipboardy'
import open from 'open'
import qrReader from './infrastructure/qrcode-reader'
import boxen from './infrastructure/boxen'
import errorHandler from './handlers/error'

import scanFromFile from './scanFromFile'

const JimpMocked = mocked(jimp, true)
const clipboardyMocked = mocked(clipboardy, true)
const openMocked = mocked(open, true)
const qrReaderMocked = mocked(qrReader, true)
const boxenMocked = mocked(boxen, true)
const errorHandlerMocked = mocked(errorHandler, true)

jest.mock('clipboardy')
jest.mock('open')
jest.mock('./infrastructure/qrcode-reader')
jest.mock('./infrastructure/boxen')
jest.mock('./infrastructure/jimp')
jest.mock('./handlers/error')

beforeEach(() => {
  JimpMocked.getBitmap.mockResolvedValue('FAKE BITMAP')
  qrReaderMocked.mockResolvedValue('FAKE QR CONTENT')
  boxenMocked.greenBox.mockReturnValue('FAKE BOX')
  clipboardyMocked.writeSync.mockResolvedValue(undefined as never)
  errorHandlerMocked.scanFromFile.mockResolvedValue(undefined as never)
  openMocked.mockResolvedValue(undefined as never)
})

afterEach(jest.restoreAllMocks)

test('should pass on happy path', async () => {
  jest.spyOn(global.console, 'log').mockReturnValue()

  await scanFromFile('FAKE PATH', {})

  expect(JimpMocked.getBitmap).toBeCalledWith('FAKE PATH')
  expect(qrReaderMocked).toBeCalledWith('FAKE BITMAP')
  expect(boxenMocked.greenBox).toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).toBeCalledWith('FAKE BOX')

  expect(clipboardy.writeSync).not.toBeCalledWith('FAKE QR CONTENT')
})

test('should copy to clipboard if flag is present', async () => {
  jest.spyOn(global.console, 'log').mockReturnValue()

  await scanFromFile('FAKE PATH', { clipboard: true })

  expect(JimpMocked.getBitmap).toBeCalledWith('FAKE PATH')
  expect(qrReader).toBeCalledWith('FAKE BITMAP')
  expect(boxen.greenBox).toBeCalledWith('FAKE QR CONTENT')

  expect(clipboardy.writeSync).toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).toBeCalledWith('FAKE BOX')
})

test('should output without box if clear flag is present', async () => {
  jest.spyOn(global.console, 'log').mockReturnValue()

  await scanFromFile('FAKE PATH', { clear: true })

  expect(JimpMocked.getBitmap).toBeCalledWith('FAKE PATH')
  expect(qrReader).toBeCalledWith('FAKE BITMAP')
  expect(boxen.greenBox).not.toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).not.toBeCalledWith('FAKE BOX')

  expect(clipboardy.writeSync).not.toBeCalledWith('FAKE QR CONTENT')
})

test('should execute flags (clear, clipboard)', async () => {
  jest.spyOn(global.console, 'log').mockReturnValue()

  await scanFromFile('FAKE PATH', { clear: true, clipboard: true })

  expect(JimpMocked.getBitmap).toBeCalledWith('FAKE PATH')
  expect(qrReader).toBeCalledWith('FAKE BITMAP')
  expect(boxen.greenBox).not.toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).not.toBeCalledWith('FAKE BOX')

  expect(clipboardy.writeSync).toBeCalledWith('FAKE QR CONTENT')
})

test('should execute open with --open', async () => {
  jest.spyOn(global.console, 'log').mockReturnValue()

  await scanFromFile('FAKE PATH', { open: true })

  expect(JimpMocked.getBitmap).toBeCalledWith('FAKE PATH')
  expect(qrReader).toBeCalledWith('FAKE BITMAP')
  expect(boxen.greenBox).toBeCalledWith('FAKE QR CONTENT')
  expect(open).toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).toBeCalledWith('FAKE BOX')
})
