import 'jest-extended'
import { scanFromBitmap } from './scanFromBitmap'
import readQR from '../infrastructure/qrcode-reader'
import { Bitmap } from '@jimp/core'
import { createMock } from 'ts-auto-mock'
import { doFlagClipboard, doOpen, FlagFunction } from '../handlers/flags'
import errorHandlers from '../handlers/error'

jest.mock('../infrastructure/qrcode-reader')
jest.mock('../handlers/flags')
jest.mock('../handlers/error')
const readQRMock = jest.mocked(readQR)
const doFlagClipboardMock = jest.mocked(doFlagClipboard)
const doOpenMock = jest.mocked(doOpen)
const errorHandlerMock = jest.mocked(errorHandlers.scanFromBitmap)

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

  describe('flags tests', () => {
    type FlagMockedFunction = jest.MockedFn<FlagFunction>
    type FlagsTestTuple = [string, FlagMockedFunction]

    const flags: FlagsTestTuple[] = [
      ['clipboard', doFlagClipboardMock],
      ['open', doOpenMock],
    ]

    it.each(flags)('should check for flag %s', async (flagName, mockedFunction) => {
      const flags = { [flagName]: true }
      await scanFromBitmap(fileBitmap, flags)

      expect(mockedFunction).toBeCalledTimes(1)
      expect(mockedFunction).toBeCalledWith(flags)
      expect(mockedFunction.mock.results[0].value).toBeCalledTimes(1)
      expect(mockedFunction.mock.results[0].value).toBeCalledWith('readQR fake result')
      expect(mockedFunction.mock.results[0].value).toHaveBeenCalledAfter(readQRMock)
    })
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
