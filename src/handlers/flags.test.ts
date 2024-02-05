import open from 'open'
import { doOpen } from './flags'
import { createMock } from 'ts-auto-mock'
import { Flags } from '../cli/flags'

const openMocked = jest.mocked(open)
jest.mock('open')
beforeEach(openMocked.mockReset)

describe('doOpen', () => {
  it('should open with text if flag open exists', () => {
    // arrange
    const flags = createMock<Flags>({ open: true })
    const input = 'some text'

    // act
    doOpen(flags)(input)

    // assert
    expect(openMocked.mock.calls[0][0]).toEqual(input)
  })

  it('should not open with text if there is no flag open', () => {
    // arrange
    const flags = createMock<Flags>({})
    const input = 'some text'

    // act
    doOpen(flags)(input)

    // assert
    expect(openMocked.mock.calls.length).toEqual(0)
  })

  it('should return text if there is no flag open', () => {
    // arrange
    const flags = createMock<Flags>({})
    const input = 'some text'

    // act
    const output = doOpen(flags)(input)

    // assert
    expect(output).toEqual(input)
  })
})
