import { stripIndent } from 'common-tags'
import { greenBox } from '../infrastructure/boxen'

export const helpText = stripIndent`
  Usage
    $ qrscanner <input file>

  Options
    --clean, -c  Clear output, just print the QR Code scan result
    --clipboard, -p  copy the qr code value to your clipboard
    --version Show installed version
    --help Show this help

  Examples
    $ qrscanner ./qrCode.jpg
    ${greenBox('This message is written in a QR Code', { margin: 1 })}

    $ qrscanner ./qrCode.jpg --clear
    This message is written in a QR Code
`
