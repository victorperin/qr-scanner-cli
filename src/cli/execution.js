const meow = require('meow')

const scanFromFile = require('../scanFromFile')

const helpText = require('./helpText')
const flags = require('./flags')

const options = { flags }

const execution = () => {
  const cli = meow(helpText, options)

  if (!cli.input.length) {
    console.warn(`[WARNING] Missing argument file: node index.js <file>!`)
    return cli.showHelp(1)
  }

  // @ts-ignore
  return scanFromFile(cli.input[0], cli.flags)
}

module.exports = execution
