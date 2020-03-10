import boxen, { BorderStyle } from 'boxen'

const GREEN_BOX_CONFIG = {
  padding: 1,
  borderStyle: BorderStyle.Double,
  borderColor: 'green',
}

export const greenBox = (text, { margin = 0 } = {}) => boxen(text, { ...GREEN_BOX_CONFIG, margin })

export default {
  greenBox,
}
