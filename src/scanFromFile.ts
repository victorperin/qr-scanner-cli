import * as fs from 'fs-extra'
import Jimp from 'jimp'
import clipboardy from 'clipboardy'
import { greenBox } from './infrastructure/boxen'
import { readQR } from './infrastructure/qrcode-reader'
import { Flags } from './cli/flags'

export const scanFromFile: (filePath: string, flags: Flags) => Promise<void> = async (
  filePath,
  flags,
) => {
  try {
    const fileContent = await fs.readFile(filePath)
    const { bitmap } = await Jimp.read(fileContent)
    const qr = await readQR(bitmap)
    if (flags.clipboard) {
      clipboardy.writeSync(qr)
    }
    const output = flags.clear ? qr : greenBox(qr)
    console.log(output)
  } catch (error) {
    console.error(error)
  }
}
