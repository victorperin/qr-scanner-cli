import { scanFromFile } from '../../src'

describe('Programatic mode - integration tests', () => {
  describe('scanFromFile', () => {
    it('Should read successfully the URL from QR-Code', async () => {
      const img = './tests/fixture/sample.jpg'

      const result = await scanFromFile(img)

      const expected = 'https://github.com/victorperin/qr-scanner-cli'
      expect(result).toEqual(expected)
    })
  })
})
