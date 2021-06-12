export type Flags = {
  clear?: boolean
  clipboard?: boolean
  open?: boolean
}

const flags = {
  clear: {
    boolean: true,
    default: false,
    alias: 'c',
    description: 'Clear output, just print the QR Code scan result',
  },
  clipboard: {
    boolean: true,
    default: false,
    alias: 'p',
    description: 'Copy the qr code value to your clipboard',
  },
  open: {
    boolean: true,
    default: false,
    alias: 'o',
    description: 'Open the qr code value in any browser or program if support it',
  },
}

export default flags
