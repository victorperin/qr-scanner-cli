import open from 'open'
import clipboardy from 'clipboardy'
import { greenBox } from '../infrastructure/boxen'

export const outputText = (flags) => (text) => {
  const output = flags.clear ? text : greenBox(text)

  console.log(output)
}

export const doFlagClipboard = (flags) => (text) => {
  if (flags.clipboard) {
    clipboardy.writeSync(text)
  }

  return text
}

export const doOpen = (flags) => (text) => {
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
