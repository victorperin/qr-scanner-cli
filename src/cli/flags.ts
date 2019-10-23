type MeowFlags = import('meow').Options['flags']

export const flags: MeowFlags = {
  clear: { type: 'boolean', alias: 'c' },
  clipboard: { type: 'boolean', alias: 'p' },
}

export interface Flags {
  clear?: boolean
  clipboard?: boolean
}
