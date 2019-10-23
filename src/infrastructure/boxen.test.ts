// @ts-nocheck
import boxen from 'boxen'
import { greenBox } from './boxen'

jest.mock('boxen')

beforeEach(boxen.mockReset)

test('Should call boxen with basic settings and return boxen content', async () => {
  boxen.mockReturnValue('MOCKED VALUE')

  const input = 'sample input'
  const greenBoxConfig = {
    padding: 1,
    borderStyle: 'double',
    borderColor: 'green',
  }

  const result = greenBox(input)
  const boxenMockFirstCall = boxen.mock.calls[0]

  expect(boxenMockFirstCall[0]).toEqual(input)
  expect(boxenMockFirstCall[1]).toMatchObject(greenBoxConfig)

  expect(result).toEqual('MOCKED VALUE')
})

test('Should add margin if config is passed', () => {
  boxen.mockReturnValue('MOCKED VALUE')

  greenBox('some input', { margin: 4 })

  const boxenMockFirstCall = boxen.mock.calls[0]
  expect(boxenMockFirstCall[1]).toMatchObject({ margin: 4 })
})
