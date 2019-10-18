const { stripIndent } = require('common-tags')

const { greenBox } = require('./boxen')

test('Should place a green box around the input', async () => {
  const result = greenBox('sample input')
  const expected = stripIndent`
    [32m╔══════════════════╗[39m
    [32m║[39m                  [32m║[39m
    [32m║[39m   sample input   [32m║[39m
    [32m║[39m                  [32m║[39m
    [32m╚══════════════════╝[39m
  `

  expect(result).toEqual(expected)
})
