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
  expect(console.warn).toHaveBeenCalledTimes(1)
})
