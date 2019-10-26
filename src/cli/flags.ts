type MeowFlags = {
  [key: string]: {
    alias: string
    type: 'string' | 'boolean'
    description: string
  }
}

export const flags: MeowFlags = {
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
}

export interface Flags {
  clear?: boolean
  clipboard?: boolean
}
