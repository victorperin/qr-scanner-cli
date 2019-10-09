const { promisify } = require('util')
const { readFile } = require('fs')

const readFilePromisified = promisify(readFile)

module.exports = {
  readFile: readFilePromisified,
}
