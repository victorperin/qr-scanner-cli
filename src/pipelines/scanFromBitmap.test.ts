import { scanFromBitmap } from './scanFromBitmap'
import readQR from '../infrastructure/qrcode-reader'
import { mocked } from 'ts-jest/utils'
import { Bitmap } from '@jimp/core'
import { createMock } from 'ts-auto-mock'
import doFlags, { doFlagClipboard } from '../handlers/flags'
import errorHandlers from '../handlers/error'

jest.mock('../infrastructure/qrcode-reader')
jest.mock('../handlers/flags')
jest.mock('../handlers/error')
const readQRMock = mocked(readQR)
const { doFlagClipboard: doFlagClipboardMock, doOpen: doOpenMock } = mocked(doFlags, true)
const errorHandlerMock = mocked(errorHandlers.scanFromBitmap)

readQRMock.mockResolvedValue('readQR fake result')
doFlagClipboardMock.mockImplementation(() => jest.fn((result) => result))
doOpenMock.mockImplementation(() => jest.fn((result) => result))

const fileBitmap: Bitmap = createMock<Bitmap>()

describe('scanFromBitmap', () => {
  it('should readQR', async () => {
    await scanFromBitmap(fileBitmap)

    expect(readQRMock).toBeCalledTimes(1)
    expect(readQRMock).toBeCalledWith(fileBitmap)
  })

  it('should check for flag clipboard', async () => {
    const flags = { clipboard: true }
    await scanFromBitmap(fileBitmap, flags)

    expect(doFlagClipboardMock).toBeCalledTimes(1)
    expect(doFlagClipboardMock).toBeCalledWith(flags)
    expect(doFlagClipboardMock.mock.results[0].value).toBeCalledWith('readQR fake result')
    expect(doFlagClipboardMock.mock.results[0].value).toHaveBeenCalledAfter(readQRMock)
  })

  it('should check for flag open', async () => {
    const flags = { clipboard: true }
    await scanFromBitmap(fileBitmap, flags)

    expect(doOpenMock).toBeCalledTimes(1)
    expect(doOpenMock).toBeCalledWith(flags)
    expect(doOpenMock.mock.results[0].value).toBeCalledWith('readQR fake result')
    expect(doFlagClipboardMock.mock.results[0].value).toHaveBeenCalledAfter(readQRMock)
  })

  describe('errors', () => {
    it('should should not execute errorHandle if no error occours', async () => {
      await scanFromBitmap(fileBitmap)

      expect(errorHandlerMock).not.toBeCalled()
    })

    it('should handle errors with errorHandlers', async () => {
      const expectedError = new Error()
      readQRMock.mockRejectedValueOnce(expectedError)
      await scanFromBitmap(fileBitmap)

      expect(errorHandlerMock).toBeCalledTimes(1)
      expect(errorHandlerMock).toBeCalledWith(expectedError)
    })
  })
})
