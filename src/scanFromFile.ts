import * as fs from 'fs-extra'
import Jimp from 'jimp'
import clipboardy from 'clipboardy'
import open from 'open'
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
    const text = await readQR(bitmap)
    if (flags.clipboard) {
      clipboardy.writeSync(text)
    }
    if (flags.open) {
      await open(text)
    }
    const output = flags.clear ? text : greenBox(text)
    console.log(output)
  } catch (error) {
    console.error(error)
  }
}
