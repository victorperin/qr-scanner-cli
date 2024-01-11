import boxen from 'boxen'
import { greenBox } from './boxen'

const boxenMocked = jest.mocked(boxen)

jest.mock('boxen')
beforeEach(() => boxenMocked.mockReset())

test('Should call boxen with basic settings and return boxen content', async () => {
  boxenMocked.mockReturnValue('MOCKED VALUE')

  const input = 'sample input'
  const greenBoxConfig = {
    padding: 1,
    borderStyle: 'double',
    borderColor: 'green',
  }

  const result = greenBox(input)

  const boxenMockFirstCall = boxenMocked.mock.calls[0]

  expect(boxenMockFirstCall[0]).toEqual(input)
  expect(boxenMockFirstCall[1]).toMatchObject(greenBoxConfig)

  expect(result).toEqual('MOCKED VALUE')
})

test('Should add margin if config is passed', () => {
  boxenMocked.mockReturnValue('MOCKED VALUE')

  greenBox('some input', { margin: 4 })

  const boxenMockFirstCall = boxenMocked.mock.calls[0]
  expect(boxenMockFirstCall[1]).toMatchObject({ margin: 4 })
})
