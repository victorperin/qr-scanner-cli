import { createMock } from 'ts-auto-mock'

import yargs, { Arguments } from 'yargs'
import { greenBox } from '../infrastructure/boxen'
import { scanFromFileOnCli } from '../pipelines/scanFromFile'
import execution from './execution'

const scanFromFileMocked = jest.mocked(scanFromFileOnCli)

const yargsMocked = jest.mocked(yargs)
yargsMocked.mockReturnValue(yargsMocked)
yargsMocked.strict.mockReturnValue(yargsMocked)
yargsMocked.example.mockReturnValue(yargsMocked)
yargsMocked.options.mockReturnValue(yargsMocked)
yargsMocked.help.mockReturnValue(yargsMocked)
yargsMocked.command.mockReturnValue(yargsMocked)
yargsMocked.positional.mockReturnValue(yargsMocked)
const defaultArgv = createMock<Arguments>({})

const greenBoxMocked = jest.mocked(greenBox)

jest.mock('../pipelines/scanFromFile', () => ({ scanFromFileOnCli: jest.fn() }))
jest.mock('yargs', yargsMocked)
jest.mock('../infrastructure/boxen', () => ({
  greenBox: jest.fn().mockImplementation((input) => input),
}))

beforeEach(jest.clearAllMocks)
beforeEach(() => (yargsMocked.argv = defaultArgv))
beforeEach(() => yargsMocked.help.mockReturnValue(yargsMocked))

test('should execute scanFrom file', async () => {
  scanFromFileMocked.mockResolvedValue()
  yargsMocked.argv = {
    ...defaultArgv,
    file: 'MOCKED FILE PATH',
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
    file: 'MOCKED FILE PATH',
    biru: 'leibe',
  }
  await execution(['MOCKED FILE PATH', '--biru', 'leibe'])

  expect(scanFromFileMocked).toBeCalledWith('MOCKED FILE PATH', { biru: 'leibe' })
  expect(yargsMocked.exit).toBeCalledWith(1, expectedError)
  expect(console.error).toBeCalledWith(expectedError.message)
})

test('should provide command and positional', async () => {
  await execution([])

  expect(greenBoxMocked).toBeCalled()
  expect(yargsMocked.command.mock.calls[0]).toMatchInlineSnapshot(`
    [
      "$0 <file>",
      "Scan a QR Code from a file",
    ]
  `)
  expect(yargsMocked.positional.mock.calls[0]).toMatchInlineSnapshot(`
    [
      "file",
      {
        "demandOption": true,
        "describe": "Path to the file to scan",
        "type": "string",
      },
    ]
  `)
})

test('should provide examples and options', async () => {
  await execution([])

  expect(greenBoxMocked).toBeCalled()
  expect(yargsMocked.example.mock.calls[0][0]).toMatchInlineSnapshot(`
    [
      [
        "qrscanner ./qrCode.jpg",
        "This message is written in a QR Code",
      ],
      [
        "qrscanner ./qrCode.jpg --clear",
        "
    This message is written in a QR Code",
      ],
    ]
  `)
  expect(yargsMocked.options.mock.calls[0][0]).toMatchInlineSnapshot(`
    {
      "clear": {
        "alias": "c",
        "boolean": true,
        "default": false,
        "description": "Clear output, just print the QR Code scan result",
      },
      "clipboard": {
        "alias": "p",
        "boolean": true,
        "default": false,
        "description": "Copy the qr code value to your clipboard",
      },
      "open": {
        "alias": "o",
        "boolean": true,
        "default": false,
        "description": "Open the qr code value in any browser or program if support it",
      },
    }
  `)
})
