const flags = {
  clear: {
    type: 'boolean',
    alias: 'c',
    description: 'Clear output, just print the QR Code scan result',
  },
  clipboard: {
    type: 'boolean',
    alias: 'p',
    description: 'Copy the qr code value to your clipboard',
  },
  open: {
    type: 'boolean',
    alias: 'o',
    description: 'Open the qr code value in any browser or program if support it',
  },
}

export default flags
