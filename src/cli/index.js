#! /usr/bin/env node
const meow = require('meow')

const scanFromFile = require('../scanFromFile')

const helpText = require('./helpText')
const flags = require('./flags')


const options = { flags }
const cli = meow(helpText, options)

if (!cli.input[0])
    return cli.showHelp(1)

scanFromFile(cli.input[0], cli.flags)
