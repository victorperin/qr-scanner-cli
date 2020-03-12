import meow from 'meow'
import { Options } from 'meow'

import scanFromFile from '../scanFromFile'

import helpText from './helpText'
import flags, { Flags } from './flags'

const options: Options<Flags> = { flags }

const execution = () => {
  const cli = meow(helpText, options)

  if (!cli.input.length) {
    console.warn(`[WARNING] Missing argument file: node index.js <file>!`)
    return cli.showHelp(1)
  }

  return scanFromFile(cli.input[0], cli.flags)
}

export default execution
