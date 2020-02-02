const scanFromFile = filePath => error => {
  if (typeof error === 'string' && error.includes('0 patterns found'))
    throw new Error('[WARNING] No pattern could be found! Is there a QR-Code?')

  if (error.message.includes('no such file or directory'))
    throw new Error(`[ERROR] File <${filePath}> not found!`)

  throw error
}

module.exports = {
  scanFromFile,
}
