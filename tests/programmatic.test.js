const qrScanner = require('..')

describe('Programmatic Tests', () => {
  test('Should read successfully the URL from QR-Code', async () => {
    const img = 'tests/fixture/sample.jpg'
    const result = await qrScanner(img)
    const expected = 'https://github.com/victorperin/qr-scanner-cli'
    expect(result).toEqual(expected)
  })

  test('Should handle missing file path parameter', async () => {
    expect.assertions(1)

    try {
      await qrScanner()
    } catch (error) {
      expect(error.message).toEqual(
        'The "path" argument must be one of type string, Buffer, or URL. Received type undefined',
      )
    }
  })

  test('Should handle file not found', async () => {
    expect.assertions(1)
    const img = '404-notfound.jpg'
    try {
      await qrScanner(img)
    } catch (error) {
      expect(error.message).toEqual("ENOENT: no such file or directory, open '404-notfound.jpg'")
    }
  })

  test('Should handle invalid file (no QR-Code)', async () => {
    expect.assertions(1)
    const img = 'tests/fixture/invalid.jpg'
    try {
      await qrScanner(img)
    } catch (error) {
      expect(error.message).toEqual("Couldn't find enough finder patterns:0 patterns found")
    }
  })
})
