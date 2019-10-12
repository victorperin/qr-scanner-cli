const execute = require('../src/cli/execute')
const { greenBox } = require('../src/infrastructure/boxen')

const ERROR = {
  MISSING_PARAMS_FILE: '[WARNING] Missing argument file: node index.js <file>!',
  FILE_NOT_FOUND: file => `[ERROR] File <${file}> not found!`,
  PATTERN_NOT_FOUND: '[WARNING] No pattern could be found! Is there a QR-Code?',
}

let consoleOutput = []
let consoleError = []
let consoleWarn = []
const originalLog = console.log
const originalError = console.error
const originalWarn = console.warn
const mockedLog = output => consoleOutput.push(output)
const mockedError = err => consoleError.push(err)
const mockedWarn = warning => consoleWarn.push(warning)

beforeEach(() => {
  console.log = mockedLog
  console.error = mockedError
  console.warn = mockedWarn
})
afterEach(() => {
  console.log = originalLog
  console.error = originalError
  console.warn = originalWarn
  consoleOutput = []
  consoleError = []
  consoleWarn = []
})

test('Should read successfully the URL from QR-Code', async () => {
  await execute({
    input: ['tests/fixture/sample.jpg'],
    flags: { clear: false, c: false, clipboard: false, p: false },
  })

  const result = consoleOutput.join('\n')
  const expected = 'https://github.com/victorperin/qr-scanner-cli'
  expect(result).toEqual(expect.stringContaining(expected))
})

test('Should output text to clipboard if -p is specified', async () => {
  await execute({
    input: ['tests/fixture/sample.jpg'],
    flags: { clear: false, c: false, clipboard: true, p: true },
  })

  const result = consoleOutput.join('\n')
  const expected = greenBox('https://github.com/victorperin/qr-scanner-cli')

  expect(result).toEqual(expected)
})

test('Should handle missing parameter <file>', async () => {
  try {
    await execute({
      input: [],
      flags: { clear: false, c: false, clipboard: false, p: false },
    })
  } catch (err) {
    const result = consoleWarn.join('\n')

    const expected = ERROR.MISSING_PARAMS_FILE
    expect(result).toEqual(expect.stringContaining(expected))
  }
})

test('Should handle file not found', async () => {
  const img = '404-notfound.jpg'
  try {
    await execute({
      input: [img],
      flags: { clear: false, c: false, clipboard: false, p: false },
    })
  } catch (err) {
    const result = consoleError.join('')

    const expected = ERROR.FILE_NOT_FOUND(img)
    expect(result).toEqual(expect.stringContaining(expected))
  }
})

test('Should handle invalid file (no QR-Code)', async () => {
  try {
    await execute({
      input: ['tests/fixture/invalid.jpg'],
      flags: { clear: false, c: false, clipboard: false, p: false },
    })
  } catch (err) {
    const result = consoleError.join('')

    const expected = ERROR.PATTERN_NOT_FOUND
    expect(result).toEqual(expect.stringContaining(expected))
  }
})
