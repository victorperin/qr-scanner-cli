const execa = require('execa')
const clipboardy = require('clipboardy')

const ERROR = {
  MISSING_PARAMS_FILE: '[WARNING] Missing argument file: node index.js <file>!',
  FILE_NOT_FOUND: file => `[ERROR] File <${file}> not found!`,
  PATTERN_NOT_FOUND: '[WARNING] No pattern could be found! Is there a QR-Code?',
}

const CLI_PATH = './src/cli/index.js'

beforeAll(() => jest.setTimeout(300000))
beforeEach(() => clipboardy.writeSync(''))

test('Should read successfully the URL from QR-Code', async () => {
  const img = 'tests/fixture/sample.jpg'
  const { stdout } = await execa(CLI_PATH, [img])

  const result = stdout
  const expected = 'https://github.com/victorperin/qr-scanner-cli'
  expect(result).toEqual(expect.stringContaining(expected))
})

test('Should output text to clipboard if -p is specified', async () => {
  const img = 'tests/fixture/sample.jpg'
  const { stdout } = await execa(CLI_PATH, [img, '-p'])

  const result = clipboardy.readSync()
  const expected = 'https://github.com/victorperin/qr-scanner-cli'

  expect(stdout).toEqual(expect.stringContaining(expected))
  expect(result).toEqual(expected)
})

test('Should handle missing parameter <file>', async () => {
  expect.assertions(2)
  try {
    await execa(CLI_PATH)
  } catch (err) {
    const { failed, stderr } = err

    const result = stderr
    const expected = ERROR.MISSING_PARAMS_FILE
    expect(failed).toBeTruthy()
    expect(result).toEqual(expect.stringContaining(expected))
  }
})

test('Should handle file not found', async () => {
  expect.assertions(2)
  const img = '404-notfound.jpg'
  try {
    await execa(CLI_PATH, [img])
  } catch (err) {
    const { failed, stderr } = err

    const result = stderr
    const expected = ERROR.FILE_NOT_FOUND(img)
    expect(failed).toBeTruthy()
    expect(result).toEqual(expect.stringContaining(expected))
  }
})

test('Should handle invalid file (no QR-Code)', async () => {
  expect.assertions(2)
  try {
    await execa(CLI_PATH, ['tests/fixture/invalid.jpg'])
  } catch (err) {
    const { failed, stderr } = err

    const result = stderr
    const expected = ERROR.PATTERN_NOT_FOUND
    expect(failed).toBeTruthy()
    expect(result).toEqual(expect.stringContaining(expected))
  }
})
