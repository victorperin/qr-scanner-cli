import { mocked } from 'ts-jest/utils'
import { createMock } from 'ts-auto-mock'

import yargs, { Arguments } from 'yargs'
import { scanFromFileOnCli } from '../pipelines/scanFromFile'
import execution from './execution'

const scanFromFileMocked = mocked(scanFromFileOnCli, true)

const yargsMocked = mocked(yargs, true)
yargsMocked.mockReturnValue(yargsMocked)
yargsMocked.strict.mockReturnValue(yargsMocked)
yargsMocked.example.mockReturnValue(yargsMocked)
yargsMocked.options.mockReturnValue(yargsMocked)
yargsMocked.help.mockReturnValue(yargsMocked)
const defaultArgv = createMock<Arguments>({})

jest.mock('../pipelines/scanFromFile', () => ({ scanFromFileOnCli: jest.fn() }))
jest.mock('yargs', yargsMocked)

beforeEach(jest.clearAllMocks)
beforeEach(() => (yargsMocked.argv = defaultArgv))

test('should execute scanFrom file', async () => {
  scanFromFileMocked.mockResolvedValue()
  yargsMocked.argv = {
    ...defaultArgv,
    _: ['MOCKED FILE PATH'],
    biru: 'leibe',
  }
  await execution(['MOCKED FILE PATH', '--biru', 'leibe'])

  expect(scanFromFileMocked).toBeCalledWith('MOCKED FILE PATH', { biru: 'leibe' })
})

test('should catch if scanFromFile fails', async () => {
  const expectedError = new Error('MOCKED ERROR')
  scanFromFileMocked.mockRejectedValue(expectedError)
  jest.spyOn(global.console, 'error').mockReturnValue()

  yargsMocked.argv = {
    ...defaultArgv,
    _: ['MOCKED FILE PATH'],
    biru: 'leibe',
  }
  await execution(['MOCKED FILE PATH', '--biru', 'leibe'])

  expect(scanFromFileMocked).toBeCalledWith('MOCKED FILE PATH', { biru: 'leibe' })
  expect(yargsMocked.exit).toBeCalledWith(1, expectedError)
  expect(console.error).toBeCalledWith(expectedError.message)
})

test('should warn if no argument passed', async () => {
  scanFromFileMocked.mockResolvedValue()
  jest.spyOn(global.console, 'warn').mockReturnValue()

  await execution([])

  expect(scanFromFileMocked).not.toBeCalled()
  expect(yargsMocked.showHelp).toBeCalled()
  expect(yargsMocked.exit).toBeCalledWith(1, new Error('missing file path'))
  expect(console.warn).toBeCalledWith('[WARNING] Missing argument file: qrscanner <file>!')
})

test('should provide examples and options', async () => {
  await execution([])

  yargsMocked.example.mock.calls

  expect(yargsMocked.example.mock.calls[0]).toMatchInlineSnapshot(`
Array [
  Array [
    Array [
      "qrscanner ./qrCode.jpg",
      "[32m[39m
[32m   ╔══════════════════════════════════════════╗[39m
   [32m║[39m                                          [32m║[39m
   [32m║[39m   This message is written in a QR Code   [32m║[39m
   [32m║[39m                                          [32m║[39m
[32m   ╚══════════════════════════════════════════╝[39m
[32m[39m",
    ],
    Array [
      "qrscanner ./qrCode.jpg --clear",
      "
This message is written in a QR Code",
    ],
  ],
]
`)
  expect(yargsMocked.options.mock.calls[0]).toMatchInlineSnapshot(`
Array [
  Object {
    "clear": Object {
      "alias": "c",
      "boolean": true,
      "default": false,
      "description": "Clear output, just print the QR Code scan result",
    },
    "clipboard": Object {
      "alias": "p",
      "boolean": true,
      "default": false,
      "description": "Copy the qr code value to your clipboard",
    },
    "open": Object {
      "alias": "o",
      "boolean": true,
      "default": false,
      "description": "Open the qr code value in any browser or program if support it",
    },
  },
]
`)
})
