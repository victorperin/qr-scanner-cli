import execa from 'execa'
import clipboardy from 'clipboardy'
import { build } from 'tsc-prog'

const ERROR = {
  MISSING_PARAMS_FILE: '[WARNING] Missing argument file: qrscanner <file>!',
  FILE_NOT_FOUND: (file: string) => `[ERROR] File <${file}> not found!`,
  PATTERN_NOT_FOUND: '[WARNING] No pattern could be found! Is there a QR-Code?',
}

const CLI_PATH = './qrscanner'

/*
  using execa with nyc is a workarround to get coverage from jest.
  More on: https://github.com/facebook/jest/issues/3190#issuecomment-354758036
*/
const execute = (args: string[] = []) =>
  execa('./node_modules/.bin/nyc', ['--silent', '--no-clean', CLI_PATH, ...args])

beforeAll(() => jest.setTimeout(300000))

// build tsc for real test cases
beforeAll(() =>
  build({
    basePath: process.cwd(),
    configFilePath: 'tsconfig.json',
    include: ['src'],
    exclude: ['**/*.test.ts'],
    compilerOptions: {
      sourceMap: true,
    },
  }),
)

beforeEach(() => clipboardy.writeSync(''))

test('Should read successfully the URL from QR-Code', async () => {
  const img = 'tests/fixture/sample.jpg'
  const { stdout } = await execute([img])

  const result = stdout
  const expected = 'https://github.com/victorperin/qr-scanner-cli'
  expect(result).toEqual(expect.stringContaining(expected))
})

test('Should output text to clipboard if -p is specified', async () => {
  const img = 'tests/fixture/sample.jpg'
  const { stdout } = await execute([img, '-p'])

  const result = clipboardy.readSync()
  const expected = 'https://github.com/victorperin/qr-scanner-cli'
  expect(stdout).toEqual(expect.stringContaining(expected))
  expect(result).toEqual(expected)
})

test('Should handle missing parameter <file>', async () => {
  expect.assertions(2)
  const { failed, stderr } = await execute().catch((err) => err)

  const expected = ERROR.MISSING_PARAMS_FILE
  expect(failed).toBeTruthy()
  expect(stderr).toEqual(expect.stringContaining(expected))
})

test('Should handle file not found', async () => {
  expect.assertions(2)
  const img = '404-notfound.jpg'
  const { failed, stderr } = await execute([img]).catch((err) => err)

  const expected = ERROR.FILE_NOT_FOUND(img)
  expect(failed).toBeTruthy()
  expect(stderr).toEqual(expect.stringContaining(expected))
})

test('Should handle invalid file (no QR-Code)', async () => {
  expect.assertions(2)
  try {
    await execute(['tests/fixture/invalid.jpg'])
  } catch (err) {
    const { failed, stderr } = err

    const result = stderr
    const expected = ERROR.PATTERN_NOT_FOUND
    expect(failed).toBeTruthy()
    expect(result).toEqual(expect.stringContaining(expected))
  }
})
