export const scanFromFile =
  (filePath: string) =>
  (error: Error): never => {
    if (error.message.includes('no such file or directory'))
      throw new Error(`[ERROR] File <${filePath}> not found!`)

    throw error
  }

export const scanFromBitmap = (error: Error | string): never => {
  if (typeof error === 'string' && error.includes('0 patterns found'))
    throw new Error('[WARNING] No pattern could be found! Is there a QR-Code?')

  throw error
}

export default {
  scanFromFile,
  scanFromBitmap,
}
