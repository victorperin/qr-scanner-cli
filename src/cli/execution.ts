import yargs from 'yargs'

import { scanFromFileOnCli } from '../pipelines/scanFromFile'

import { greenBox } from '../infrastructure/boxen'
import flags from './flags'

const execution = async (args: string[]): Promise<void> => {
  const yargsInstance = yargs(args)
    .strict()
    .example([
      ['qrscanner ./qrCode.jpg', greenBox('This message is written in a QR Code', { margin: 1 })],
      ['qrscanner ./qrCode.jpg --clear', '\nThis message is written in a QR Code'],
    ])
    .command('$0 <file>', 'Scan a QR Code from a file')
    .positional('file', {
      describe: 'Path to the file to scan',
      type: 'string',
      demandOption: true,
    })
    .options(flags)
    .help()

  const argv = await yargsInstance.argv

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _, $0, file, ...flagsTreated } = argv

  return scanFromFileOnCli(file, flagsTreated).catch((error: Error) => {
    console.error(error.message)
    return yargsInstance.exit(1, error)
  })
}

export default execution
