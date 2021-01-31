import 'jest-extended'
import { scanFromBitmap } from './scanFromBitmap'
import readQR from '../infrastructure/qrcode-reader'
import { mocked } from 'ts-jest/utils'
import { Bitmap } from '@jimp/core'
import { createMock } from 'ts-auto-mock'
import { doFlagClipboard, doOpen, FlagFunction } from '../handlers/flags'
import errorHandlers from '../handlers/error'
import { MockedFunction } from 'ts-jest/dist/utils/testing'

jest.mock('../infrastructure/qrcode-reader')
jest.mock('../handlers/flags')
jest.mock('../handlers/error')
const readQRMock = mocked(readQR)
const doFlagClipboardMock = mocked(doFlagClipboard)
const doOpenMock = mocked(doOpen)
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

  describe('flags tests', () => {
    type FlagMockedFunction = MockedFunction<FlagFunction>
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
