import open from 'open'
import clipboardy from 'clipboardy'
import { greenBox } from '../infrastructure/boxen'
import { Flags } from '../cli/flags'

export type FlagFunction = (flags: Flags) => (string: string) => string

export const outputText = (flags: Flags) => (text: string): void => {
  const output = flags.clear ? text : greenBox(text)

  console.log(output)
}

export const doFlagClipboard: FlagFunction = (flags) => (text) => {
  if (flags.clipboard) {
    clipboardy.writeSync(text)
  }

  return text
}

export const doOpen: FlagFunction = (flags) => (text) => {
  if (flags.open) {
    open(text)
  }
  return text
}

export default {
  outputText,
  doFlagClipboard,
  doOpen,
}
