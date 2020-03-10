import boxen, { BorderStyle } from 'boxen'

const GREEN_BOX_CONFIG = {
  padding: 1,
  borderStyle: BorderStyle.Double,
  borderColor: 'green',
}

const greenBox = (text, { margin = 0 } = {}) => boxen(text, { ...GREEN_BOX_CONFIG, margin })

module.exports = {
  greenBox,
}
