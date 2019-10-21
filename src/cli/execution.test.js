const meow = require('meow')
const clipboardy = require('clipboardy')

const scanFromFile = require('../scanFromFile')
const execution = require('./execution')
const boxen = require('../infrastructure/boxen')

jest.mock('clipboardy')
jest.mock('../scanFromFile.js')
jest.mock('../infrastructure/boxen')

beforeEach(() => {
  boxen.greenBox.mockReturnValue('FAKE BOX')
  clipboardy.writeSync.mockResolvedValue('FAKE CLIPBOARD')
})

test('should execute scanFrom file', async () => {
  scanFromFile.mockResolvedValue(Promise.resolve('MOCKED SCAN RESULT'))
  jest.spyOn(global.console, 'log').mockReturnValue()
  meow.mockReturnValue({ input: ['MOCKED FILE PATH'], flags: { biru: 'laibe' } })
  await execution()

  expect(meow).toHaveBeenCalledTimes(1)
  expect(scanFromFile).toBeCalledWith('MOCKED FILE PATH')
  expect(boxen.greenBox).toBeCalledWith('MOCKED SCAN RESULT')
  expect(console.log).toBeCalledWith('FAKE BOX')

  expect(clipboardy.writeSync).not.toBeCalledWith('MOCKED SCAN RESULT')
})

test('should warn if no argument passed', async () => {
  scanFromFile.mockResolvedValue(Promise.resolve('MOCKED SCAN RESULT'))
  const helpSpy = jest.fn()
  jest.spyOn(global.console, 'warn').mockReturnValue()

  meow.mockReturnValue({ input: [], flags: { biru: 'laibe' }, showHelp: helpSpy })
  await execution()

  expect(meow).toHaveBeenCalledTimes(1)
  expect(scanFromFile).not.toBeCalled()
  expect(helpSpy).toBeCalledWith(1)
  expect(console.warn).toHaveBeenCalledTimes(1)
})

test('should copy to clipboard if flag is present', async () => {
  jest.spyOn(global.console, 'log').mockReturnValue()
  scanFromFile.mockResolvedValue(Promise.resolve('MOCKED SCAN RESULT'))

  meow.mockReturnValue({ input: ['FAKE PATH'], flags: { clipboard: true } })
  await execution()

  expect(meow).toHaveBeenCalledTimes(1)
  expect(boxen.greenBox).toBeCalledWith('MOCKED SCAN RESULT')

  expect(clipboardy.writeSync).toBeCalledWith('MOCKED SCAN RESULT')
  expect(console.log).toBeCalledWith('FAKE BOX')
})

test('should output without box if clear flag is present', async () => {
  jest.spyOn(global.console, 'log').mockReturnValue()
  scanFromFile.mockResolvedValue(Promise.resolve('MOCKED SCAN RESULT'))

  meow.mockReturnValue({ input: ['FAKE PATH'], flags: { clear: true } })
  await execution()

  expect(meow).toHaveBeenCalledTimes(1)
  expect(boxen.greenBox).not.toBeCalledWith('MOCKED SCAN RESULT')
  expect(clipboardy.writeSync).not.toBeCalledWith('MOCKED SCAN RESULT')
  expect(console.log).not.toBeCalledWith('FAKE BOX')
  expect(console.log).toBeCalledWith('MOCKED SCAN RESULT')
})

test('should execute flags (clear, clipboard)', async () => {
  jest.spyOn(global.console, 'log').mockReturnValue()
  scanFromFile.mockResolvedValue(Promise.resolve('MOCKED SCAN RESULT'))

  meow.mockReturnValue({ input: ['FAKE PATH'], flags: { clear: true, clipboard: true } })
  await execution()

  expect(meow).toHaveBeenCalledTimes(1)
  expect(boxen.greenBox).not.toBeCalledWith('MOCKED SCAN RESULT')
  expect(clipboardy.writeSync).toBeCalledWith('MOCKED SCAN RESULT')
  expect(console.log).not.toBeCalledWith('FAKE BOX')
  expect(console.log).toBeCalledWith('MOCKED SCAN RESULT')
})
