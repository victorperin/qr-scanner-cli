import meow from 'meow'
import * as flags from './flags'
import { helpText } from './helpText'
import { scanFromFile } from '../scanFromFile'

const meowOptions: meow.Options = { flags: flags }

export const execution = () => {
  const cli = meow(helpText, meowOptions)

  if (!cli.input.length) {
    console.warn(`[WARNING] Missing argument file: node index.js <file>!`)
    return cli.showHelp(1)
  }

  return scanFromFile(cli.input[0], cli.flags)
}
