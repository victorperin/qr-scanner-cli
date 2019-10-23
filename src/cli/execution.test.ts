// @ts-nocheck
import meow from 'meow'
import { scanFromFile } from '../scanFromFile'
import { execution } from './execution'

jest.mock('../scanFromFile.ts')

test('should execute scanFrom file', () => {
  scanFromFile.mockResolvedValue('MOCKED SCAN RESULT')
  meow.mockReturnValue({ input: ['MOCKED FILE PATH'], flags: { biru: 'laibe' } })
  execution()

  expect(meow).toHaveBeenCalledTimes(1)
  expect(scanFromFile).toBeCalledWith('MOCKED FILE PATH', { biru: 'laibe' })
})

test('should warn if no argument passed', () => {
  const helpSpy = jest.fn()
  jest.spyOn(global.console, 'warn').mockReturnValue()

  meow.mockReturnValue({ input: [], flags: { biru: 'laibe' }, showHelp: helpSpy })
  execution()

  expect(meow).toHaveBeenCalledTimes(1)
  expect(scanFromFile).not.toBeCalled()
  expect(helpSpy).toBeCalledWith(1)
  expect(console.warn).toHaveBeenCalledTimes(1)
})
