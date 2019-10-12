const meow = require('meow')

const scanFromFile = require('../scanFromFile')

const helpText = require('./helpText')
const flags = require('./flags')

const options = { flags }
const cliDefault = meow(helpText, options)

const execute = (cli = cliDefault) => {
  if (!cli.input.length) {
    console.warn(`[WARNING] Missing argument file: node index.js <file>!`)
    return cli.showHelp(1)
  }

  return scanFromFile(cli.input[0], cli.flags)
}

module.exports = execute
