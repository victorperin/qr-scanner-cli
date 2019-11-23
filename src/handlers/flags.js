const open = require('open')
const clipboardy = require('clipboardy')
const { greenBox } = require('../infrastructure/boxen')

const outputText = flags => text => {
  const output = flags.clear ? text : greenBox(text)

  console.log(output)
}

const doFlagClipboard = flags => text => {
  if (flags.clipboard) {
    clipboardy.writeSync(text)
  }

  return text
}

const doOpen = flags => text => {
  if (flags.open) {
    open(text)
  }
  return text
}

module.exports = {
  outputText,
  doFlagClipboard,
  doOpen,
}
