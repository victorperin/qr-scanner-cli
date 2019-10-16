const { greenBox } = require('../src/infrastructure/boxen')

test('Should fail', async () => {
  expect(greenBox('sample input')).toMatchSnapshot()
})
