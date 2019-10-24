const { stripIndent } = require('common-tags')
const { greenBox } = require('../infrastructure/boxen')
const flags = require('../cli/flags')

const flagDescriptions = Object.keys(flags)
  .map(flagKey => {
    const flag = flags[flagKey]
    return `    --${flagKey}, -${flag.alias}  ${flag.description}`
  })
  .join('\n')

const helpText = stripIndent`
  Usage
    $ qrscanner <input file>

  Options
${flagDescriptions}
    --version Show installed version
    --help Show this help

  Examples
    $ qrscanner ./qrCode.jpg
    ${greenBox('This message is written in a QR Code', { margin: 1 })}

    $ qrscanner ./qrCode.jpg --clear
    This message is written in a QR Code
`

module.exports = helpText
