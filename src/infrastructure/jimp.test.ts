import { mocked } from 'ts-jest/utils'
import { createMock } from 'ts-auto-mock'
import Jimp from 'jimp'
import { Bitmap } from '@jimp/core'
import { getBitmap } from './jimp'

jest.mock('jimp', () => ({ read: jest.fn() }))
const jimpMock = mocked(Jimp)
beforeEach(jimpMock.read.mockReset)

describe('jimp/getBitmap', () => {
  it('should execute Jimp.read with input', async () => {
    const fakeJimpObject = createMock<Jimp>()
    jimpMock.read.mockResolvedValue(fakeJimpObject)

    await getBitmap('SOME FILE PATH')

    expect(Jimp.read).toBeCalledWith('SOME FILE PATH')
  })

  it('should return bitmap from Jimp.read response', async () => {
    const fakeBitmap = createMock<Bitmap>()
    const fakeJimpObject = createMock<Jimp>({ bitmap: fakeBitmap })
    jimpMock.read.mockResolvedValue(fakeJimpObject)

    const result = await getBitmap('')

    expect(result).toBe(fakeBitmap)
  })
})
