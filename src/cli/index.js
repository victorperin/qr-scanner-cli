#! /usr/bin/env node
const meow = require('meow')

const scanFromFile = require('../scanFromFile')

const helpText = require('./helpText')
const flags = require('./flags')

const options = { flags }
const cli = meow(helpText, options)

const execute = () => {
  if (!cli.input.length) {
    console.warn(`[WARNING] Missing argument file: node index.js <file>!`)
    return cli.showHelp(1)
  }

  return scanFromFile(cli.input[0], cli.flags)
}

execute()
