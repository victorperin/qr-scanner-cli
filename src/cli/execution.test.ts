import { mocked } from 'ts-jest/utils'
import meow from 'meow'

import { scanFromFileOnCli } from '../pipelines/scanFromFile'
import execution from './execution'

const meowMocked = mocked(meow, true)
const scanFromFileMocked = mocked(scanFromFileOnCli, true)

jest.mock('../pipelines/scanFromFile', () => ({ scanFromFileOnCli: jest.fn() }))
jest.mock('meow', jest.fn)

const DEFAULT_MEOW_PROPERTIES = {
  unnormalizedFlags: {},
  pkg: {},
  help: '',
  showHelp: () => null,
  showVersion: () => null,
}

test('should execute scanFrom file', () => {
  scanFromFileMocked.mockResolvedValue()
  meowMocked.mockReturnValue({
    ...DEFAULT_MEOW_PROPERTIES,
    input: ['MOCKED FILE PATH'],
    flags: { biru: 'laibe' },
  })

  execution()

  expect(meowMocked).toHaveBeenCalledTimes(1)
  expect(scanFromFileMocked).toBeCalledWith('MOCKED FILE PATH', { biru: 'laibe' })
})

test('should warn if no argument passed', () => {
  scanFromFileMocked.mockResolvedValue()
  const helpSpy = jest.fn()
  jest.spyOn(global.console, 'warn').mockReturnValue()

  meowMocked.mockReturnValue({
    ...DEFAULT_MEOW_PROPERTIES,
    input: [],
    flags: { biru: 'laibe' },
    showHelp: helpSpy,
  })

  execution()

  expect(meow).toHaveBeenCalledTimes(1)
  expect(scanFromFileMocked).not.toBeCalled()
  expect(helpSpy).toBeCalledWith(1)
  expect(console.warn).toHaveBeenCalledTimes(1)
})
