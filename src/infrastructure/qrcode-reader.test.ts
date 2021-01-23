import qrcodeReaderLib from 'qrcode-reader'
import qrcodeReader from './qrcode-reader'
import { createMock } from 'ts-auto-mock'
import { mocked } from 'ts-jest/utils'
import { Bitmap } from '@jimp/core'

jest.mock('qrcode-reader')
const qrcodeReaderLibMocked = mocked(qrcodeReaderLib, true)

beforeEach(qrcodeReaderLibMocked.mockClear)

test('should resolve if qr is qrcode-reader runs callback without errors', async (done) => {
  const fakeImageBitmap = createMock<Bitmap>()
  const qrPromise = qrcodeReader(fakeImageBitmap)

  expect(qrcodeReaderLibMocked).toHaveBeenCalledTimes(1)
  const qrcodeReaderLibMockedInstance = qrcodeReaderLibMocked.mock.instances[0]

  qrcodeReaderLibMockedInstance.callback(null, { result: 'FAKE RESULT' })
  const mockDecode = qrcodeReaderLibMockedInstance.decode

  expect(mockDecode).toHaveBeenCalledWith(fakeImageBitmap)

  await expect(qrPromise).resolves.toEqual('FAKE RESULT').then(done)
})

test('should reject if qr is qrcode-reader runs callback with error', (done) => {
  const fakeImageBitmap = createMock<Bitmap>()
  const qrPromise = qrcodeReader(fakeImageBitmap)

  const qrcodeReaderLibMockedInstance = qrcodeReaderLibMocked.mock.instances[0]

  const fakeError = new Error('FAKE ERROR')
  qrcodeReaderLibMockedInstance.callback(fakeError)

  expect(qrPromise).rejects.toEqual(fakeError).then(done)
})
