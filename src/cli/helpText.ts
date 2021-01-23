import { stripIndent } from 'common-tags'
import { greenBox } from '../infrastructure/boxen'
import flags from '../cli/flags'

const flagDescriptions = Object.entries(flags)
  .map(([flagKey, flag]) => `    --${flagKey}, -${flag.alias}  ${flag.description}`)
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

export default helpText
