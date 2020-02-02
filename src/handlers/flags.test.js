const open = require('open')

const { doOpen } = require('./flags')

jest.mock('open')
beforeEach(open.mockReset)

describe('doOpen', () => {
  it('should open with text if flag open exists', () => {
    // arrange
    const flags = { open: true }
    const input = 'some text'

    // act
    doOpen(flags)(input)

    // assert
    expect(open.mock.calls[0][0]).toEqual(input)
  })

  it('should not open with text if there is no flag open', () => {
    // arrange
    const flags = {}
    const input = 'some text'

    // act
    doOpen(flags)(input)

    // assert
    expect(open.mock.calls.length).toEqual(0)
  })

  it('should return text if there is no flag open', () => {
    // arrange
    const flags = {}
    const input = 'some text'

    // act
    const output = doOpen(flags)(input)

    // assert
    expect(output).toEqual(input)
  })
})
