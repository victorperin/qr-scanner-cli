const Jimp = require('jimp')
const { getBitmap } = require('./jimp')

jest.mock('jimp')
beforeEach(Jimp.mockReset)

describe('jimp/getBitmap', () => {
  it('should execute Jimp.read with input', async () => {
    Jimp.read.mockResolvedValue({})

    await getBitmap('SOME FILE PATH')

    expect(Jimp.read).toBeCalledWith('SOME FILE PATH')
  })

  it('should return bitmap from Jimp.read response', async () => {
    Jimp.read.mockResolvedValue({ bitmap: 'SOME BITMAP' })

    const result = await getBitmap('')

    expect(result).toBe('SOME BITMAP')
  })
})
