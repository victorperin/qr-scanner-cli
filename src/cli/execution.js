const meow = require('meow')
const clipboardy = require('clipboardy')

const scanFromFile = require('../scanFromFile')

const { greenBox } = require('../infrastructure/boxen')

const helpText = require('./helpText')
const flags = require('./flags')

const options = { flags }

const outputText = (text, cliFlags) => {
  const output = cliFlags.clear ? text : greenBox(text)

  console.log(output)
}

const doFlagClipboard = (text, cliFlags) => {
  if (cliFlags.clipboard) {
    clipboardy.writeSync(text)
  }

  return text
}

const execution = () => {
  const cli = meow(helpText, options)

  if (!cli.input.length) {
    console.warn(`[WARNING] Missing argument file: node index.js <file>!`)
    return cli.showHelp(1)
  }

  return scanFromFile(cli.input[0])
    .then(t => doFlagClipboard(t, cli.flags))
    .then(t => outputText(t, cli.flags))
    .catch(console.error)
}

module.exports = execution
