import { scanFromFile, scanFromBitmap } from '../../src'
import { read } from 'jimp'

describe('Programatic mode - integration tests', () => {
  describe('scanFromFile', () => {
    it('Should read successfully the URL from QR-Code', async () => {
      const img = './tests/fixture/sample.jpg'

      const result = await scanFromFile(img)

      const expected = 'https://github.com/victorperin/qr-scanner-cli'
      expect(result).toEqual(expected)
    })
  })

  describe('scanFromBitmap', () => {
    it('Should read successfully the bitmap', async () => {
      const img = './tests/fixture/sample.jpg'
      const { bitmap } = await read(img)

      const result = await scanFromBitmap(bitmap)

      const expected = 'https://github.com/victorperin/qr-scanner-cli'
      expect(result).toEqual(expected)
    })
  })
})
