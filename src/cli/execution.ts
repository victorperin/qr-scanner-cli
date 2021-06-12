import yargs from 'yargs'

import { scanFromFileOnCli } from '../pipelines/scanFromFile'

import { greenBox } from '../infrastructure/boxen'
import flags from './flags'

const execution = (args: string[]): Promise<void> | void => {
  const yargsInstance = yargs(args)
    .strict()
    .example([
      ['qrscanner ./qrCode.jpg', greenBox('This message is written in a QR Code', { margin: 1 })],
      ['qrscanner ./qrCode.jpg --clear', '\nThis message is written in a QR Code'],
    ])
    .options(flags)
    .help()

  const argv = yargsInstance.argv

  if (!argv['_'].length) {
    console.warn(`[WARNING] Missing argument file: qrscanner <file>!`)
    yargsInstance.showHelp()
    return yargsInstance.exit(1, new Error('missing file path'))
  }

  const { _, $0, ...flagsTreated } = argv
  const filePath = _[0].toString()

  return scanFromFileOnCli(filePath, flagsTreated)
}

export default execution
