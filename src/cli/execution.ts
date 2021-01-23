import meow from 'meow'
import { Options } from 'meow'

import scanFromFile from '../pipelines/scanFromFile'

import helpText from './helpText'
import flags, { Flags, FlagsDefinition } from './flags'

const options: Options<FlagsDefinition> = { flags }

const execution = (): Promise<void> | void => {
  const cli = meow<FlagsDefinition>(helpText, options)

  if (!cli.input.length) {
    console.warn(`[WARNING] Missing argument file: node index.js <file>!`)
    return cli.showHelp(1)
  }

  return scanFromFile(cli.input[0], cli.flags as Flags)
}

export default execution
