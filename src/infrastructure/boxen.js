const boxen = require('boxen')

/**
 * @type {boxen.Options}
 */
const GREEN_BOX_CONFIG = {
  padding: 1,
  // @ts-ignore
  borderStyle: 'double',
  borderColor: 'green',
}

/**
 *
 * @param {string} text
 * @param {{margin?:number}} param1
 */
const greenBox = (text, { margin = 0 } = {}) => boxen(text, { ...GREEN_BOX_CONFIG, margin })

module.exports = {
  greenBox,
}
