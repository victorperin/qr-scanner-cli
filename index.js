#! /usr/bin/env node

const chalk = require('chalk')
const meow = require('meow')

const qrScanner = require('./qrscanner')

const cli = meow(
  `
    Usage
      $ qrscanner <input file>

    Options
      --clean, -c  Clear output, just print the QR Code scan result
      --version Show installed version
      --help Show this help

    Examples
      $ qrscanner ./qrCode.jpg
      ${chalk.green('╔══════════════════════════════════════════╗')}
      ${chalk.green('║')}                                          ${chalk.green('║')}
      ${chalk.green('║')}   This message is written in a QR Code   ${chalk.green('║')}
      ${chalk.green('║')}                                          ${chalk.green('║')}
      ${chalk.green('╚══════════════════════════════════════════╝')}

      $ qrscanner ./qrCode.jpg --clear
      This message is written in a QR Code
`,
  {
    flags: {
      clear: {
        type: 'boolean',
        alias: 'c',
      },
    },
  },
)

qrScanner(cli)
