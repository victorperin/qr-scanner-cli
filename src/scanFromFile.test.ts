// @ts-nocheck
import * as fs from 'fs-extra'
import Jimp from 'jimp'
import clipboardy from 'clipboardy'
import { readQR } from './infrastructure/qrcode-reader'
import { greenBox } from './infrastructure/boxen'
import { scanFromFile } from './scanFromFile'

jest.mock('jimp')
jest.mock('clipboardy')
jest.mock('fs-extra')
jest.mock('./infrastructure/qrcode-reader')
jest.mock('./infrastructure/boxen')

beforeEach(() => {
  fs.readFile.mockResolvedValue('FAKE FILE CONTENT')
  Jimp.read.mockResolvedValue({ bitmap: 'FAKE BITMAP' })
  readQR.mockResolvedValue('FAKE QR CONTENT')
  greenBox.mockReturnValue('FAKE BOX')
  clipboardy.writeSync.mockResolvedValue('FAKE CLIPBOARD')
})

afterEach(jest.restoreAllMocks)

test('should pass on happy path', async () => {
  jest.spyOn(global.console, 'log').mockReturnValue()

  await scanFromFile('FAKE PATH', {})

  expect(fs.readFile).toBeCalledWith('FAKE PATH')
  expect(Jimp.read).toBeCalledWith('FAKE FILE CONTENT')
  expect(readQR).toBeCalledWith('FAKE BITMAP')
  expect(greenBox).toBeCalledWith('FAKE QR CONTENT')
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
  expect(readQR).toBeCalledWith('FAKE BITMAP')
  expect(greenBox).toBeCalledWith('FAKE QR CONTENT')

  expect(clipboardy.writeSync).toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).toBeCalledWith('FAKE BOX')
})

test('should output without box if clear flag is present', async () => {
  jest.spyOn(global.console, 'log').mockReturnValue()

  await scanFromFile('FAKE PATH', { clear: true })

  expect(fs.readFile).toBeCalledWith('FAKE PATH')
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

  expect(fs.readFile).toBeCalledWith('FAKE PATH')
  expect(Jimp.read).toBeCalledWith('FAKE FILE CONTENT')
  expect(readQR).toBeCalledWith('FAKE BITMAP')
  expect(greenBox).not.toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).toBeCalledWith('FAKE QR CONTENT')
  expect(console.log).not.toBeCalledWith('FAKE BOX')

  expect(clipboardy.writeSync).toBeCalledWith('FAKE QR CONTENT')
})
