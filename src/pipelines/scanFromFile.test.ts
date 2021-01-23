import { mocked } from 'ts-jest/utils'
import * as jimp from '../infrastructure/jimp'
import clipboardy from 'clipboardy'
import open from 'open'
import qrReader from '../infrastructure/qrcode-reader'
import boxen from '../infrastructure/boxen'
import errorHandler from '../handlers/error'
import { createMock } from 'ts-auto-mock'
import { Bitmap } from '@jimp/core'

import scanFromFile from './scanFromFile'

const JimpMocked = mocked(jimp, true)
const clipboardyMocked = mocked(clipboardy, true)
const openMocked = mocked(open, true)
const qrReaderMocked = mocked(qrReader, true)
const boxenMocked = mocked(boxen, true)
const errorHandlerMocked = mocked(errorHandler, true)

jest.mock('clipboardy')
jest.mock('open')
jest.mock('../infrastructure/qrcode-reader')
jest.mock('../infrastructure/boxen')
jest.mock('../infrastructure/jimp', () => ({ getBitmap: jest.fn() }))
jest.mock('../handlers/error')

const fakeBitmap = createMock<Bitmap>()

beforeEach(() => {
  JimpMocked.getBitmap.mockResolvedValue(fakeBitmap)
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
  expect(qrReaderMocked).toBeCalledWith(fakeBitmap)
  expect(boxenMocked.greenBox).toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).toBeCalledWith('FAKE BOX')

  expect(clipboardy.writeSync).not.toBeCalledWith('FAKE QR CONTENT')
})

test('should copy to clipboard if flag is present', async () => {
  jest.spyOn(global.console, 'log').mockReturnValue()

  await scanFromFile('FAKE PATH', { clipboard: true })

  expect(JimpMocked.getBitmap).toBeCalledWith('FAKE PATH')
  expect(qrReader).toBeCalledWith(fakeBitmap)
  expect(boxen.greenBox).toBeCalledWith('FAKE QR CONTENT')

  expect(clipboardy.writeSync).toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).toBeCalledWith('FAKE BOX')
})

test('should output without box if clear flag is present', async () => {
  jest.spyOn(global.console, 'log').mockReturnValue()

  await scanFromFile('FAKE PATH', { clear: true })

  expect(JimpMocked.getBitmap).toBeCalledWith('FAKE PATH')
  expect(qrReader).toBeCalledWith(fakeBitmap)
  expect(boxen.greenBox).not.toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).not.toBeCalledWith('FAKE BOX')

  expect(clipboardy.writeSync).not.toBeCalledWith('FAKE QR CONTENT')
})

test('should execute flags (clear, clipboard)', async () => {
  jest.spyOn(global.console, 'log').mockReturnValue()

  await scanFromFile('FAKE PATH', { clear: true, clipboard: true })

  expect(JimpMocked.getBitmap).toBeCalledWith('FAKE PATH')
  expect(qrReader).toBeCalledWith(fakeBitmap)
  expect(boxen.greenBox).not.toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).not.toBeCalledWith('FAKE BOX')

  expect(clipboardy.writeSync).toBeCalledWith('FAKE QR CONTENT')
})

test('should execute open with --open', async () => {
  jest.spyOn(global.console, 'log').mockReturnValue()

  await scanFromFile('FAKE PATH', { open: true })

  expect(JimpMocked.getBitmap).toBeCalledWith('FAKE PATH')
  expect(qrReader).toBeCalledWith(fakeBitmap)
  expect(boxen.greenBox).toBeCalledWith('FAKE QR CONTENT')
  expect(open).toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).toBeCalledWith('FAKE BOX')
})
