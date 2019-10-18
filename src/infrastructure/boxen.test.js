const { greenBox } = require('./boxen')

test('Should place a green box around the input', async () => {
  expect(greenBox('sample input')).toMatchSnapshot()
})
