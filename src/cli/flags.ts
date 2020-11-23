import { BooleanFlag } from 'meow'

type FlagWithDescription<T> = T & {
  description: string
}

export type Flags = {
  clear: FlagWithDescription<BooleanFlag>
  clipboard: FlagWithDescription<BooleanFlag>
  open: FlagWithDescription<BooleanFlag>
}

const flags: Flags = {
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
