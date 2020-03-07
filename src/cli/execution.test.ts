const { mocked } = require('ts-jest/utils')
const meow = require('meow')

const scanFromFile = require('../scanFromFile')
const execution = require('./execution')

const meowMocked = mocked(meow, true)
const scanFromFileMocked = mocked(scanFromFile)

jest.mock('../scanFromFile.js')
jest.mock('meow', jest.fn)

test('should execute scanFrom file', () => {
  scanFromFileMocked.mockResolvedValue('MOCKED SCAN RESULT')
  meowMocked.mockReturnValue({ input: ['MOCKED FILE PATH'], flags: { biru: 'laibe' } })
  execution()

  expect(meowMocked).toHaveBeenCalledTimes(1)
  expect(scanFromFileMocked).toBeCalledWith('MOCKED FILE PATH', { biru: 'laibe' })
})

test('should warn if no argument passed', () => {
  scanFromFileMocked.mockResolvedValue('MOCKED SCAN RESULT')
  const helpSpy = jest.fn()
  jest.spyOn(global.console, 'warn').mockReturnValue()

  meowMocked.mockReturnValue({ input: [], flags: { biru: 'laibe' }, showHelp: helpSpy })
  execution()

  expect(meow).toHaveBeenCalledTimes(1)
  expect(scanFromFileMocked).not.toBeCalled()
  expect(helpSpy).toBeCalledWith(1)
  expect(console.warn).toHaveBeenCalledTimes(1)
})
