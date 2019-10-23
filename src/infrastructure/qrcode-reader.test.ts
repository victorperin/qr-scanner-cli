// @ts-nocheck
import originalLib from 'qrcode-reader'
import { readQR } from './qrcode-reader'

jest.mock('qrcode-reader')

beforeEach(originalLib.mockClear)

test('should resolve if qr is qrcode-reader runs callback without errors', done => {
  const fakeImageBitmap = 'FAKE BITMAP'
  const qrPromise = readQR(fakeImageBitmap)

  expect(originalLib).toHaveBeenCalledTimes(1)
  const originalLibInstance = originalLib.mock.instances[0]

  originalLibInstance.callback(null, { result: 'FAKE RESULT' })
  const mockDecode = originalLibInstance.decode

  expect(mockDecode).toHaveBeenCalledWith(fakeImageBitmap)

  expect(qrPromise)
    .resolves.toEqual('FAKE RESULT')
    .then(done)
})

test('should reject if qr is qrcode-reader runs callback with error', done => {
  const fakeImageBitmap = 'FAKE BITMAP'
  const qrPromise = readQR(fakeImageBitmap)

  const originalLibInstance = originalLib.mock.instances[0]

  originalLibInstance.callback('FAKE ERROR')

  expect(qrPromise)
    .rejects.toEqual('FAKE ERROR')
    .then(done)
})
